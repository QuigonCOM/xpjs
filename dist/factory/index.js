"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactory = void 0;
const consts_1 = require("../consts");
__exportStar(require("./factories"), exports);
const __1 = require("..");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const axios_1 = __importDefault(require("axios"));
const cons_1 = require("./cons");
const out_1 = require("@elrondnetwork/erdjs/out");
const heartbeat_1 = require("../heartbeat");
const ethers_1 = require("ethers");
const algorand_1 = require("../helpers/algorand");
const algosdk_1 = __importDefault(require("algosdk"));
const js_base64_1 = require("js-base64");
function mapNonceToParams(chainParams) {
    const cToP = new Map();
    cToP.set(consts_1.Chain.ELROND, chainParams.elrondParams);
    cToP.set(consts_1.Chain.HECO, chainParams.hecoParams);
    cToP.set(consts_1.Chain.BSC, chainParams.bscParams);
    cToP.set(consts_1.Chain.ETHEREUM, chainParams.ropstenParams);
    cToP.set(consts_1.Chain.AVALANCHE, chainParams.avalancheParams);
    cToP.set(consts_1.Chain.POLYGON, chainParams.polygonParams);
    cToP.set(consts_1.Chain.FANTOM, chainParams.fantomParams);
    cToP.set(consts_1.Chain.TRON, chainParams.tronParams);
    cToP.set(consts_1.Chain.CELO, chainParams.celoParams);
    cToP.set(consts_1.Chain.HARMONY, chainParams.harmonyParams);
    cToP.set(consts_1.Chain.ONT, chainParams.ontologyParams);
    cToP.set(consts_1.Chain.XDAI, chainParams.xDaiParams);
    cToP.set(consts_1.Chain.ALGORAND, chainParams.algorandParams);
    cToP.set(consts_1.Chain.FUSE, chainParams.fuseParams);
    cToP.set(consts_1.Chain.UNIQUE, chainParams.uniqueParams);
    cToP.set(consts_1.Chain.TEZOS, chainParams.tezosParams);
    cToP.set(consts_1.Chain.VELAS, chainParams.velasParams);
    cToP.set(consts_1.Chain.IOTEX, chainParams.iotexParams);
    cToP.set(consts_1.Chain.AURORA, chainParams.auroraParams);
    return cToP;
}
/**
 * This function is the basic entry point to use this package as a library.
 * @param appConfig: {@link AppConfig} The configuration of the library.
 * @param chainParams: {@link ChainParams} Contains the details for all the chains to mint and transfer NFTs between them.
 * @returns {ChainFactory}: A factory object that can be used to mint and transfer NFTs between chains.
 */
function ChainFactory(appConfig, chainParams) {
    let helpers = new Map();
    let cToP = mapNonceToParams(chainParams);
    const heartbeatRepo = heartbeat_1.bridgeHeartbeat(appConfig.heartbeatUri);
    const remoteExchangeRate = cons_1.exchangeRateRepo(appConfig.exchangeRateUri);
    const txSocket = __1.socketHelper(appConfig.txSocketUri);
    const nftlistRest = axios_1.default.create({
        baseURL: appConfig.nftListUri,
        headers: {
            Authorization: `Bearer ${appConfig.nftListAuthToken}`,
        },
    });
    const inner = async (chain) => {
        let helper = helpers.get(chain);
        if (helper === undefined) {
            helper = await consts_1.CHAIN_INFO.get(chain).constructor(cToP.get(chain));
            helpers.set(chain, helper);
        }
        return helper;
    };
    async function calcExchangeFees(fromChain, toChain, val) {
        const rate = await remoteExchangeRate.getBatchedRate([
            consts_1.CHAIN_INFO.get(toChain).currency,
            consts_1.CHAIN_INFO.get(fromChain).currency,
        ]);
        const feeR = val.dividedBy(consts_1.CHAIN_INFO.get(toChain).decimals);
        const fromExRate = rate.get(consts_1.CHAIN_INFO.get(fromChain).currency);
        const toExRate = rate.get(consts_1.CHAIN_INFO.get(toChain).currency);
        const usdFee = Math.min(Math.max(consts_1.FEE_MARGIN.min, feeR.times(toExRate * 0.1).toNumber()), consts_1.FEE_MARGIN.max);
        const feeProfit = usdFee / fromExRate;
        return feeR
            .times(toExRate / fromExRate)
            .plus(feeProfit)
            .times(consts_1.CHAIN_INFO.get(fromChain).decimals)
            .integerValue(bignumber_js_1.default.ROUND_CEIL);
    }
    const estimateFees = async (fromChain, toChain, nft, receiver) => {
        const estimate = await toChain.estimateValidateTransferNft(receiver, nft, "");
        const conv = await calcExchangeFees(fromChain.getNonce(), toChain.getNonce(), estimate);
        return conv;
    };
    async function bridgeStatus() {
        const res = await heartbeatRepo.status();
        return Object.fromEntries(Object.entries(res).map(([c, s]) => [
            c,
            s.bridge_alive ? "alive" : "dead",
        ]));
    }
    async function estimateBatchFees(fromChain, toChain, nft, receiver) {
        const estimate = await toChain.estimateValidateTransferNftBatch(receiver, nft, new Array(nft.length).fill(toChain.XpNft));
        const conv = await calcExchangeFees(fromChain.getNonce(), toChain.getNonce(), estimate.times(nft.length));
        return conv;
    }
    async function requireBridge(chains) {
        const status = await heartbeatRepo.status();
        let deadChain;
        const alive = chains.every((c) => {
            const stat = status[c].bridge_alive;
            if (!stat) {
                deadChain = c;
            }
            return stat;
        });
        if (!alive) {
            throw Error(`chain ${deadChain} is dead! its unsafe to use the bridge`);
        }
    }
    const oldXpWraps = new Set([
        "0xe12B16FFBf7D79eb72016102F3e3Ae6fe03fCA56",
        "0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d",
        "0xe12B16FFBf7D79eb72016102F3e3Ae6fe03fCA56",
        "0xa1B8947Ff4C1fD992561F629cfE67aEb90DfcBd5",
        "0x09F4e56187541f2bC660B0810cA509D2f8c65c96",
        "0x8B2957DbDC69E158aFceB9822A2ff9F2dd5BcD65",
        "0xE773Be36b35e7B58a9b23007057b5e2D4f6686a1",
        "0xFC2b3dB912fcD8891483eD79BA31b8E5707676C9",
        "0xb4A252B3b24AF2cA83fcfdd6c7Fac04Ff9d45A7D",
    ]);
    function checkNotOldWrappedNft(contract) {
        if (oldXpWraps.has(contract)) {
            throw new Error(`${contract} is an old wrapped NFT`);
        }
    }
    function checkMintWith(mw, contracts) {
        return (contracts.find((x) => x.toLowerCase() === mw.toLowerCase().trim()) !=
            undefined);
    }
    async function isWrappedNft(nft, fc) {
        var _a, _b;
        if (fc === consts_1.Chain.TEZOS) {
            return (typeof ((_a = nft.native.meta) === null || _a === void 0 ? void 0 : _a.wrapped) !== 'undefined');
        }
        try {
            checkNotOldWrappedNft(nft.collectionIdent);
        }
        catch (_) {
            return false;
        }
        return (typeof ((_b = (await axios_1.default.get(nft.uri).catch(() => undefined))) === null || _b === void 0 ? void 0 : _b.data.wrapped) !==
            "undefined");
    }
    async function getVerifiedContracts(from, tc, fc) {
        const res = await axios_1.default.get(`https://nodes.xp.network/sc-verify/verify/list?from=${from}&targetChain=${tc}&fromChain=${fc}`);
        return res.data.data.map((r) => r.to);
    }
    return {
        getVerifiedContracts,
        async transferBatchNft(from, to, nfts, signer, receiver, fee, mw) {
            let result = [];
            await requireBridge([from.getNonce(), to.getNonce()]);
            if (!fee) {
                fee = await estimateBatchFees(from, to, nfts, receiver);
            }
            if (!(await to.validateAddress(receiver))) {
                throw Error("invalid address");
            }
            const wrapped = [];
            const unwrapped = [];
            await Promise.all(nfts.map(async (e) => {
                // @ts-ignore
                if (e.native.contractType && e.native.contractType === "ERC721") {
                    throw new Error(`ERC721 is not supported`);
                }
                if (await isWrappedNft(e, from.getNonce())) {
                    wrapped.push(e);
                }
                else {
                    unwrapped.push(e);
                }
            }));
            wrapped.length &&
                result.push(from.transferNftBatchToForeign(signer, to.getNonce(), receiver, unwrapped, mw || to.XpNft || "", new bignumber_js_1.default(fee)));
            unwrapped.length &&
                result.push(from.unfreezeWrappedNftBatch(signer, to.getNonce(), receiver, wrapped, new bignumber_js_1.default(fee)));
            return await Promise.all(result);
        },
        estimateBatchFees,
        async getDestinationTransaction(chain, targetNonce, txn) {
            const action = await chain.extractAction(txn);
            const hash = await txSocket.waitTxHash(targetNonce, action);
            const status = await chain.extractTxnStatus(hash);
            return [hash, status];
        },
        async pkeyToSigner(nonce, key) {
            switch (nonce) {
                case consts_1.Chain.ELROND: {
                    return out_1.UserSigner.fromPem(key);
                }
                case consts_1.Chain.TRON: {
                    return key;
                }
                case consts_1.Chain.ALGORAND: {
                    const algo = await inner(consts_1.Chain.ALGORAND);
                    const mnem = algosdk_1.default.secretKeyToMnemonic(js_base64_1.Base64.toUint8Array(key));
                    return algorand_1.algoSignerWrapper(algo.algod, algosdk_1.default.mnemonicToSecretKey(mnem));
                }
                default: {
                    const chainH = (await inner(nonce));
                    return chainH.createWallet(key);
                }
            }
        },
        estimateFees,
        inner,
        bridgeStatus,
        updateParams(chainNonce, params) {
            helpers.delete(chainNonce);
            cToP.set(chainNonce, params);
        },
        async nftList(chain, owner) {
            let res = await nftlistRest.get(`/nfts/${chain.getNonce()}/${owner}`);
            if (res.headers["Retry-After"]) {
                await new Promise((r) => setTimeout(r, 30000));
                return await this.nftList(chain, owner);
            }
            return res.data.data;
        },
        transferNft: async (fromChain, toChain, nft, sender, receiver, fee, mintWith) => {
            //@ts-ignore
            if (nft.native.contract) {
                if (fromChain.getNonce() !== 9 && fromChain.getNonce() !== 18) {
                    //@ts-ignore
                    checkNotOldWrappedNft(new ethers_1.utils.getAddress(nft.native.contract));
                }
            }
            const mw = 
            //@ts-ignore
            nft.native.contract &&
                mintWith &&
                checkMintWith(mintWith, 
                //@ts-ignore
                await getVerifiedContracts(
                //@ts-ignore
                nft.native.contract.toLowerCase(), toChain.getNonce(), fromChain.getNonce()))
                ? mintWith
                : toChain.XpNft;
            await requireBridge([fromChain.getNonce(), toChain.getNonce()]);
            if (!fee) {
                fee = await estimateFees(fromChain, toChain, nft, receiver);
            }
            if (!(await toChain.validateAddress(receiver))) {
                throw Error("invalid address");
            }
            if (mw === undefined || mw === "") {
                throw new Error(`Mint with is not set`);
            }
            console.log(`Minting With : ${mw}`);
            if (await isWrappedNft(nft, fromChain.getNonce())) {
                const res = await fromChain.unfreezeWrappedNft(sender, receiver, nft, new bignumber_js_1.default(fee), toChain.getNonce().toString());
                return res;
            }
            else {
                const res = await fromChain.transferNftToForeign(sender, toChain.getNonce(), receiver, nft, new bignumber_js_1.default(fee), mw || "");
                return res;
            }
        },
        mint: async (chain, owner, args) => {
            return await chain.mintNft(owner, args);
        },
        waitAlgorandNft: async (origin, hash, claimer) => {
            const action = await origin.extractAction(hash);
            return await txSocket.waitAlgorandNft(origin.getNonce(), claimer.address, action);
        },
        claimableAlgorandNfts: async (claimer) => {
            const algo = await inner(consts_1.Chain.ALGORAND);
            return await algo.claimableNfts(txSocket, claimer);
        },
        async checkWhitelist(chain, nft) {
            if (!chain.isNftWhitelisted || (await isWrappedNft(nft, chain.getNonce()))) {
                return true;
            }
            return await chain.isNftWhitelisted(nft);
        },
    };
}
exports.ChainFactory = ChainFactory;
__exportStar(require("./factories"), exports);
__exportStar(require("./cons"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esc0NBQTBEO0FBQzFELDhDQUE0QjtBQUU1QiwwQkFZWTtBQUNaLGdFQUFxQztBQUVyQyxrREFBMEI7QUFDMUIsaUNBQTBDO0FBQzFDLGtEQUFzRDtBQUN0RCw0Q0FBK0M7QUFDL0MsbUNBQStCO0FBQy9CLGtEQU02QjtBQUM3QixzREFBOEI7QUFDOUIseUNBQW1DO0FBOE5uQyxTQUFTLGdCQUFnQixDQUFDLFdBQWlDO0lBQ3pELE1BQU0sSUFBSSxHQUFhLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsY0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxD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