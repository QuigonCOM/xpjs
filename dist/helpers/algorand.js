"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorandHelper = exports.algoSignerWrapper = exports.typedAlgoSigner = void 0;
const algosdk_1 = __importDefault(require("algosdk"));
const axios_1 = __importDefault(require("axios"));
const bignumber_js_1 = require("bignumber.js");
const js_base64_1 = require("js-base64");
/**
 * This library is written in typescript.
 * unfortunately the browser extension injects the AlgoSigner in a way we can't get a typed object wwithout this hack.
 *
 * @return Strongly typed AlgoSigner from extension
 */
function typedAlgoSigner() {
    //@ts-expect-error why do you inject libraries like this :|
    if (typeof AlgoSigner === "undefined") {
        throw Error("algosigner not available!");
    }
    //@ts-expect-error why do you inject libraries like this :|
    return AlgoSigner;
}
exports.typedAlgoSigner = typedAlgoSigner;
function algoSignerWrapper(algod, acc) {
    const signer = {
        accounts(_) {
            return Promise.resolve([
                {
                    address: acc.addr,
                },
            ]);
        },
        signTxn(txns) {
            return Promise.resolve(txns.map((t) => {
                const signed = algosdk_1.default.signTransaction(algosdk_1.default.decodeUnsignedTransaction(js_base64_1.Base64.toUint8Array(t.txn)), acc.sk);
                return {
                    txID: signed.txID,
                    blob: js_base64_1.Base64.fromUint8Array(signed.blob),
                };
            }));
        },
        send({ tx }) {
            return algod.sendRawTransaction(js_base64_1.Base64.toUint8Array(tx)).do();
        },
    };
    return {
        algoSigner: signer,
        address: acc.addr,
        ledger: "any",
    };
}
exports.algoSignerWrapper = algoSignerWrapper;
const encoder = new TextEncoder();
const MINT_NFT_COST = new bignumber_js_1.BigNumber(1000);
function algorandHelper(args) {
    const appAddr = algosdk_1.default.getApplicationAddress(args.sendNftAppId);
    const algod = new algosdk_1.default.Algodv2(args.algodApiKey, args.algodUri, args.algodPort);
    async function waitTxnConfirm(txId) {
        const status = await algod.status().do();
        let lastRound = status["last-round"];
        let pendingInfo = await algod.pendingTransactionInformation(txId).do();
        while (!(pendingInfo["confirmed-round"] && pendingInfo["confirmed-round"] > 0)) {
            lastRound += 1;
            await algod.statusAfterBlock(lastRound).do();
            pendingInfo = await algod.pendingTransactionInformation(txId).do();
        }
    }
    const transferNft = async (signer, chain_nonce, to, nft, txFees) => {
        const suggested = await algod.getTransactionParams().do();
        const feesTx = algosdk_1.default.makePaymentTxnWithSuggestedParamsFromObject({
            from: signer.address,
            to: appAddr,
            amount: BigInt(txFees.toString()),
            suggestedParams: suggested,
        });
        const transferTx = algosdk_1.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: signer.address,
            to: appAddr,
            amount: 1,
            assetIndex: nft.native.nftId,
            suggestedParams: suggested,
        });
        const tCallTx = algosdk_1.default.makeApplicationNoOpTxnFromObject({
            from: signer.address,
            appIndex: args.sendNftAppId,
            appArgs: [
                encoder.encode("receive_nft"),
                encoder.encode(to),
                new Uint8Array(Buffer.concat([
                    Buffer.from(new Uint32Array([0]).buffer),
                    Buffer.from(new Uint32Array([chain_nonce]).buffer).reverse(),
                ])),
            ],
            foreignAssets: [nft.native.nftId],
            suggestedParams: suggested,
        });
        algosdk_1.default.assignGroupID([feesTx, transferTx, tCallTx]);
        const encodedTxns = [
            { txn: js_base64_1.Base64.fromUint8Array(feesTx.toByte()) },
            { txn: js_base64_1.Base64.fromUint8Array(transferTx.toByte()) },
            { txn: js_base64_1.Base64.fromUint8Array(tCallTx.toByte()) },
        ];
        const signedTxns = await signer.algoSigner.signTxn(encodedTxns);
        const sendRes = await algod
            .sendRawTransaction([
            js_base64_1.Base64.toUint8Array(signedTxns[0].blob),
            js_base64_1.Base64.toUint8Array(signedTxns[1].blob),
            js_base64_1.Base64.toUint8Array(signedTxns[2].blob),
        ])
            .do();
        await waitTxnConfirm(sendRes.txId);
        return sendRes.txId;
    };
    async function claimNft(signer, info) {
        const suggested = await algod.getTransactionParams().do();
        const optIn = algosdk_1.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: signer.address,
            to: signer.address,
            amount: 0,
            assetIndex: info.nftId,
            suggestedParams: suggested,
        });
        const encodedTx = js_base64_1.Base64.fromUint8Array(optIn.toByte());
        const signedTx = await signer.algoSigner.signTxn([{ txn: encodedTx }]);
        const res = await signer.algoSigner.send({
            ledger: signer.ledger,
            tx: signedTx[0].blob,
        });
        await waitTxnConfirm(res.txId);
        const callTxn = algosdk_1.default.makeApplicationNoOpTxnFromObject({
            from: signer.address,
            appIndex: info.appId,
            appArgs: [encoder.encode("transfer_nft")],
            foreignAssets: [info.nftId],
            suggestedParams: suggested,
        });
        const encodedCall = js_base64_1.Base64.fromUint8Array(callTxn.toByte());
        const signedCall = await signer.algoSigner.signTxn([
            {
                txn: encodedCall,
            },
        ]);
        const callRes = await signer.algoSigner.send({
            ledger: signer.ledger,
            tx: signedCall[0].blob,
        });
        await waitTxnConfirm(callRes.txId);
        return callRes.txId;
    }
    return {
        algod,
        getNonce: () => args.nonce,
        claimNft,
        async claimAlgorandNft(signer, sourceChain, action, socket) {
            const info = await socket.waitAlgorandNft(sourceChain, signer.address, action);
            return await claimNft(signer, info);
        },
        async preTransfer(sender, nft, _fee) {
            const user = await algod.accountInformation(appAddr).do();
            for (let i = 0; i < user["assets"].length; i++) {
                if (user["assets"][i]["asset-id"] === nft.native.nftId) {
                    return undefined;
                }
            }
            const suggested = await algod.getTransactionParams().do();
            const callTx = algosdk_1.default.makeApplicationNoOpTxnFromObject({
                from: sender.address,
                appIndex: args.sendNftAppId,
                appArgs: [encoder.encode("opt_in_nft")],
                foreignAssets: [nft.native.nftId],
                suggestedParams: suggested,
            });
            const encodedTx = js_base64_1.Base64.fromUint8Array(callTx.toByte());
            const signedTxCall = await sender.algoSigner.signTxn([{ txn: encodedTx }]);
            const res = await sender.algoSigner.send({
                ledger: sender.ledger,
                tx: signedTxCall[0].blob,
            });
            await waitTxnConfirm(res.txId);
            return suggested;
        },
        isWrappedNft(nft) {
            return nft.native.creator === appAddr;
        },
        transferNftToForeign: transferNft,
        unfreezeWrappedNft: async (signer, to, nft, txFees) => {
            const nftMeta = await axios_1.default.get(nft.uri);
            return await transferNft(signer, parseInt(nftMeta.data.wrapped.origin), to, nft, txFees);
        },
        estimateValidateTransferNft: () => Promise.resolve(MINT_NFT_COST),
        estimateValidateUnfreezeNft: () => Promise.resolve(MINT_NFT_COST),
        validateAddress: (adr) => Promise.resolve(algosdk_1.default.isValidAddress(adr)),
        claimableNfts: async (txSocket, owner) => {
            const claims = await txSocket.claimNfts(owner);
            const nfts = new Set();
            const user = await algod.accountInformation(appAddr).do();
            for (let i = 0; i < user["assets"].length; i++) {
                if (user["assets"][i]["amount"].toString() === "1") {
                    nfts.add(user["assets"][i]["asset-id"]);
                }
            }
            const res = await Promise.all(claims.map(async (v) => {
                const appId = parseInt(v.app_id);
                const nftId = parseInt(v.nft_id);
                const assetInfo = await algod.getAssetByID(nftId).do();
                if (nfts.has(nftId)) {
                    return [];
                }
                return [{
                        nftId,
                        appId,
                        uri: assetInfo.params.url,
                        name: assetInfo.params.name || ''
                    }];
            }));
            return res.flat();
        }
    };
}
exports.algorandHelper = algorandHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb3JhbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9hbGdvcmFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBbUQ7QUFDbkQsa0RBQTBCO0FBQzFCLCtDQUF5QztBQUN6Qyx5Q0FBbUM7QUFxRG5DOzs7OztHQUtHO0FBQ0gsU0FBZ0IsZUFBZTtJQUM3QiwyREFBMkQ7SUFDM0QsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLEVBQUU7UUFDckMsTUFBTSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUMxQztJQUVELDJEQUEyRDtJQUMzRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBUkQsMENBUUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FDL0IsS0FBc0IsRUFDdEIsR0FBb0I7SUFFcEIsTUFBTSxNQUFNLEdBQWtCO1FBQzVCLFFBQVEsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNyQjtvQkFDRSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUk7aUJBQ2xCO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFJO1lBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQ3BDLGlCQUFPLENBQUMseUJBQXlCLENBQUMsa0JBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzdELEdBQUcsQ0FBQyxFQUFFLENBQ1AsQ0FBQztnQkFDRixPQUFPO29CQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDakIsSUFBSSxFQUFFLGtCQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ3pDLENBQUM7WUFDSixDQUFDLENBQUMs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