"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainFactoryConfigs = void 0;
//@ts-ignore
const tronweb_1 = __importDefault(require("tronweb"));
const consts_1 = require("../consts");
const ethers_1 = require("ethers");
const taquito_1 = require("@taquito/taquito");
const notifier_1 = require("../notifier");
const connex_driver_1 = require("@vechain/connex-driver");
const thor = __importStar(require("web3-providers-connex"));
const connex_framework_1 = require("@vechain/connex-framework");
const EVM_VALIDATORS = [
    "0xffa74a26bf87a32992bb4be080467bb4a8019e00",
    "0x837b2eb764860b442c971f98f505e7c5f419edd7",
    "0x9671ce5a02eb53cf0f2cbd220b34e50c39c0bf23",
    "0x90e79cc7a06dbd227569920a8c4a625f630d77f4",
    "0xdc80905cafeda39cb19a566baeef52472848e82f",
    "0x77745cd585798e55938940e3d4dd0fd7cde7bdd6",
    "0xc2a29b4e9fa71e9033a52611544403241c56ac5e",
];
// const _EVM_TESTNET_VALIDATORS = [
//   "0x50aCEC08ce70aa4f2a8ab2F45d8dCd1903ea4E14",
//   "0xae87208a5204B6606d3AB177Be5fdf62267Cd499",
//   "0x5002258315873AdCbdEF25a8E71C715A4f701dF5",
// ];
const middleware_uri = "https://notifier.xp.network";
const testnet_middleware_uri = "http://65.21.195.10/notify-test/";
var ChainFactoryConfigs;
(function (ChainFactoryConfigs) {
    ChainFactoryConfigs.TestNet = async () => {
        const feeMargin = { min: 0.5, max: 5 };
        const notifier = notifier_1.evNotifier(testnet_middleware_uri);
        const net = new connex_driver_1.SimpleNet(consts_1.TestNetRpcUri.VECHAIN);
        const driver = await connex_driver_1.Driver.connect(net);
        const provider = thor.ethers.modifyProvider(
        //@ts-ignore
        new ethers_1.ethers.providers.Web3Provider(new thor.ConnexProvider({ connex: new connex_framework_1.Framework(driver) })));
        return {
            elrondParams: {
                node_uri: consts_1.TestNetRpcUri.ELROND,
                minter_address: "erd1qqqqqqqqqqqqqpgqnd6nmq4vh8e3xrxqrxgpwfldgp3sje83k4as3lusln",
                esdt_swap_address: "erd1qqqqqqqqqqqqqpgq62h6fe5myaajkeva09whewaw8u2hsuexk4as29tzn9",
                esdt_nft: "XPNFT-fc0a99",
                esdt_swap: "WEGLD-2d1d69",
                notifier,
                nonce: 2,
                feeMargin,
            },
            vechainParams: {
                notifier,
                feeMargin,
                nonce: consts_1.Chain.VECHAIN,
                provider,
                minter_addr: "0x73575AC2b3dDd497b50B46642B5bBf0B43c3400A",
                erc721_addr: "0x72Bd2eB1585aaC9c30Bc2875a3C16dea8B7fC232",
                erc721Minter: "0x683d0327A82e2Ad24b9F7a4b17faA608cfceeC2d",
                erc1155Minter: "0x2FeD1EbDe30484B3a13fB1552291D333537317f9",
            },
            tronParams: {
                provider: new tronweb_1.default({ fullHost: consts_1.TestNetRpcUri.TRON }),
                notifier,
                minter_addr: "TY46GA3GGdMtu9GMaaSPPSQtqq9CZAv5sK",
                erc721_addr: "TDhb2kyurMwoc1eMndKzqNebji1ap1DJC4",
                erc1155Minter: "TBeSKv5RSFLAi7SCD7hR64xuvP6N26oEqR",
                erc721Minter: "TMVDt5PP53eQro5hLafibv2xWzSSDSMyjy",
                validators: [
                    "TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo",
                    "TN9bHXEWditocT4Au15mgm7JM56XBnRCvm",
                    "TRHLhivxVogGhtxKn6sC8UF2Fr3WBdaT8N",
                ],
                nonce: consts_1.Chain.TRON,
                feeMargin,
            },
            avalancheParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.AVALANCHE),
                minter_addr: "0x0F00f81162ABC95Ee6741a802A1218C67C42e714",
                erc721_addr: "0x42027aF22E36e839e138dc387F1b7428a85553Cc",
                erc1155Minter: "0x10E3EE8526Cc7610393E2f6e25dEee0bD38d057e",
                erc721Minter: "0x1F71E80E1E785dbDB34c69909C11b71bAd8D9802",
                nonce: consts_1.Chain.AVALANCHE,
                feeMargin,
            },
            polygonParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.POLYGON),
                minter_addr: "0x224f78681099D66ceEdf4E52ee62E5a98CCB4b9e",
                erc721_addr: "0xb678b13E41a47e46A4046a4D8315b32E0F34389c",
                erc1155Minter: "0x5A768f8dDC67ccCA1431879BcA28E93a6c7722bb",
                erc721Minter: "0x6516E2D3387A9CF4E5e868E7842D110c95A9f3B4",
                nonce: consts_1.Chain.POLYGON,
                feeMargin,
            },
            fantomParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.FANTOM),
                minter_addr: "0x9a287810bA8F0564DaDd9F2Ea9B7B2459497416B",
                erc721_addr: "0x3F51015C76D7A64514E9B86D500bBFD44F95bdE9",
                erc1155Minter: "string",
                erc721Minter: "string",
                nonce: consts_1.Chain.FANTOM,
                feeMargin,
            },
            bscParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.BSC),
                minter_addr: "0x3Dd26fFf61D2a79f5fB77100d6daDBF073F334E6",
                erc721_addr: "0x783eF7485DCF27a3Cf59F5A0A406eEe3f9b2AaeB",
                erc1155Minter: "0x5dA3b7431f4581a7d35aEc2f3429174DC0f2A2E1",
                erc721Minter: "0x97CD6fD6cbFfaa24f5c858843955C2601cc7F2b9",
                nonce: consts_1.Chain.BSC,
                feeMargin,
            },
            celoParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.CELO),
                minter_addr: "0x9a287810bA8F0564DaDd9F2Ea9B7B2459497416B",
                erc721_addr: "0x3F51015C76D7A64514E9B86D500bBFD44F95bdE9",
                erc1155Minter: "string",
                erc721Minter: "string",
                nonce: consts_1.Chain.CELO,
                feeMargin,
            },
            harmonyParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.HARMONY),
                minter_addr: "0x198Cae9EE853e7b44E99c0b35Bddb451F83485d5",
                erc721_addr: "0x1280c5c11bF0aAaaEAeBc998893B42e08B26fD5A",
                erc1155Minter: "0xB546c2358A6e4b0B83192cCBB83CaE37FA572fe1",
                erc721Minter: "0xb036640d6f7cAfd338103dc60493250561Af2eBc",
                nonce: consts_1.Chain.HARMONY,
                feeMargin,
            },
            ropstenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.ROPSTEN),
                minter_addr: "0x57d2Ad1a14C77627D5f82B7A0F244Cfe391e59C5",
                erc721_addr: "0x48B218C9f626F079b82f572E3c5B46251c40fc47",
                erc1155Minter: "0x0F00f81162ABC95Ee6741a802A1218C67C42e714",
                erc721Minter: "0x42027aF22E36e839e138dc387F1b7428a85553Cc",
                nonce: consts_1.Chain.ETHEREUM,
                feeMargin,
            },
            xDaiParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.XDAI),
                minter_addr: "0x90d38996B210D45bDF2FD54d091C6061dff0dA9F",
                erc721_addr: "0x0e02b55e1D0ec9023A04f1278F39685B53739010",
                erc1155Minter: "0x0AA29baB4F811A9f3dcf6a0F9cAEa9bE18ECED78",
                erc721Minter: "0x7cB14C4aB12741B5ab185C6eAFb5Eb7b5282A032",
                nonce: consts_1.Chain.XDAI,
                feeMargin,
            },
            algorandParams: {
                algodApiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                indexerUri: "https://algoindexer.testnet.algoexplorerapi.io",
                algodUri: "https://node.testnet.algoexplorerapi.io",
                nonce: consts_1.Chain.ALGORAND,
                sendNftAppId: 83148194,
                algodPort: 443,
                notifier,
                feeMargin,
            },
            auroraParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.AURORA),
                erc721_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                minter_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
                erc1155Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc721Minter: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                nonce: consts_1.Chain.AURORA,
                feeMargin,
            },
            uniqueParams: {
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.UNIQUE),
                nonce: consts_1.Chain.UNIQUE,
                erc721_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                minter_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                erc1155Minter: "string",
                erc721Minter: "string",
                notifier,
                feeMargin,
            },
            tezosParams: {
                bridgeAddress: "KT195omxiopL2ZDqM3g8hRj2sSCG2pTqjNEj",
                notifier,
                Tezos: new taquito_1.TezosToolkit(consts_1.TestNetRpcUri.TEZOS),
                xpnftAddress: "KT1LZ3YqxgHy8jao5L8VBFyMUoPkxhgfLhLV",
                validators: [
                    "tz1iKCCYmhayfpp1HvVA8Fmp4PkY5Z7XnDdX",
                    "tz1g4CJW1mzVLvN8ycHFg9JScpuzYrJhZcnD",
                    "tz1exbY3JKPRpo2KLegK8iqoVNRLn1zFrnZi",
                ],
                feeMargin,
            },
            velasParams: {
                notifier,
                erc721_addr: "0xE657b66d683bF4295325c5E66F6bb0fb6D1F7551",
                minter_addr: "0x5051679FEDf0D7F01Dc23e72674d0ED58de9be6a",
                erc1155Minter: "0x941972fa041F507eBb8CfD5d11C05Eb1a51f2E95",
                erc721Minter: "0x5df32A2F15D021DeF5086cF94fbCaC4594208A26",
                nonce: consts_1.Chain.VELAS,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.VELAS),
                feeMargin,
            },
            iotexParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.IOTEX),
                minter_addr: "0xE657b66d683bF4295325c5E66F6bb0fb6D1F7551",
                erc721_addr: "0x5D822bA2a0994434392A0f947C83310328CFB0DE",
                erc1155Minter: "0x5df32A2F15D021DeF5086cF94fbCaC4594208A26",
                erc721Minter: "0xC3dB3dBcf007961541BE1ddF15cD4ECc0Fc758d5",
                nonce: consts_1.Chain.IOTEX,
                feeMargin,
            },
            godwokenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.GODWOKEN),
                minter_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
                erc721_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                erc721Minter: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                erc1155Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                nonce: consts_1.Chain.GODWOKEN,
                feeMargin,
            },
            gateChainParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.GATECHAIN),
                minter_addr: "0x2B24de7BFf5d2ab01b1C53682Ee5987c9BCf1BAc",
                erc721_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
                erc721Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc1155Minter: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                nonce: consts_1.Chain.GATECHAIN,
                feeMargin,
            },
        };
    };
    ChainFactoryConfigs.MainNet = async () => {
        const feeMargin = { min: 0.5, max: 5 };
        const notifier = notifier_1.evNotifier(middleware_uri);
        return {
            elrondParams: {
                node_uri: consts_1.MainNetRpcUri.ELROND,
                minter_address: "erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8",
                esdt_swap_address: "erd1qqqqqqqqqqqqqpgq5vuvac70kn36yk4rvf9scr6p8tlu23220drsfgszfy",
                esdt_nft: "XPNFT-cb7482",
                esdt_swap: "WEGLD-5f1f8d",
                notifier,
                nonce: consts_1.Chain.ELROND,
                feeMargin,
            },
            tronParams: {
                provider: new tronweb_1.default({ fullHost: consts_1.MainNetRpcUri.TRON }),
                notifier,
                minter_addr: "TMx1nCzbK7tbBinLh29CewahpbR1k64c8E",
                erc721_addr: "TRON",
                nonce: consts_1.Chain.TRON,
                validators: EVM_VALIDATORS,
                feeMargin,
            },
            avalancheParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.AVALANCHE),
                erc721Minter: "0x9b2bACF4E69c81EF4EF42da84872aAC39ce7EC62",
                erc1155Minter: "0x73E8deFC951D228828da35Ff8152f25c1e5226fa",
                erc721_addr: "0x7bf2924985CAA6192D721B2B9e1109919aC6ff58",
                minter_addr: "0xC254a8D4eF5f825FD31561bDc69551ed2b8db134",
                erc1155_addr: "0x73E8deFC951D228828da35Ff8152f25c1e5226fa",
                nonce: consts_1.Chain.AVALANCHE,
                feeMargin,
            },
            polygonParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.POLYGON),
                erc721Minter: "0x7E8493F59274651Cc0919feCf12E6A77153cdA72",
                erc1155Minter: "0x73E8deFC951D228828da35Ff8152f25c1e5226fa",
                erc721_addr: "0xC254a8D4eF5f825FD31561bDc69551ed2b8db134",
                erc1155_addr: "0x7bf2924985CAA6192D721B2B9e1109919aC6ff58",
                minter_addr: "0x14CAB7829B03D075c4ae1aCF4f9156235ce99405",
                nonce: consts_1.Chain.POLYGON,
                feeMargin,
            },
            fantomParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.FANTOM),
                erc721Minter: "0xC81D46c6F2D59182c5A64FD5C372266c98985AdF",
                erc1155Minter: "0x146a99Ff19ece88EC87f5be03085cA6CD3163E15",
                erc1155_addr: "0x4bA4ADdc803B04b71412439712cB1911103380D6",
                erc721_addr: "0x75f93b47719Ab5270d27cF28a74eeA247d5DfeFF",
                minter_addr: "0x97dd1B3AE755539F56Db8b29258d7C925b20b84B",
                nonce: consts_1.Chain.FANTOM,
                feeMargin,
            },
            bscParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.BSC),
                erc721Minter: "0xa66dA346C08dD77bfB7EE5E68C45010B6F2538ff",
                erc1155_addr: "0x3F888c0Ee72943a3Fb1c169684A9d1e8DEB9f537",
                erc1155Minter: "0xF5e0c79CB0B7e7CF6Ad2F9779B01fe74F958964a",
                erc721_addr: "0x0cC5F00e673B0bcd1F780602CeC6553aec1A57F0",
                minter_addr: "0x0B7ED039DFF2b91Eb4746830EaDAE6A0436fC4CB",
                nonce: consts_1.Chain.BSC,
                feeMargin,
            },
            celoParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.CELO),
                minter_addr: "string",
                erc721_addr: "string",
                erc1155Minter: "string",
                erc721Minter: "string",
                nonce: consts_1.Chain.CELO,
                feeMargin,
            },
            harmonyParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.HARMONY),
                minter_addr: "0x1358844f14feEf4D99Bc218C9577d1c7e0Cb2E89",
                erc721_addr: "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A",
                erc1155_addr: "0xFEeD85607C1fbc2f30EAc13281480ED6265e121E",
                erc1155Minter: "0xF547002799955812378137FA30C21039E69deF05",
                erc721Minter: "0x57d2Ad1a14C77627D5f82B7A0F244Cfe391e59C5",
                nonce: consts_1.Chain.HARMONY,
                feeMargin,
            },
            ropstenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.ETHEREUM),
                minter_addr: "0x1cC24128C04093d832D4b50609e182ed183E1688",
                erc721_addr: "0x32E8854DC2a5Fd7049DCF10ef2cb5f01300c7B47",
                erc1155_addr: "0x041AE550CB0e76a3d048cc2a4017BbCB74756b43",
                erc1155Minter: "0xca8E2a118d7674080d71762a783b0729AadadD42",
                erc721Minter: "0xF547002799955812378137FA30C21039E69deF05",
                nonce: consts_1.Chain.ETHEREUM,
                feeMargin,
            },
            xDaiParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.XDAI),
                erc721Minter: "0x82A7d50A0030935808dAF6e5f0f06645866fb7Bb",
                erc1155Minter: "0xFEeD85607C1fbc2f30EAc13281480ED6265e121E",
                erc721_addr: "0x1358844f14feEf4D99Bc218C9577d1c7e0Cb2E89",
                erc1155_addr: "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A",
                minter_addr: "0x81e1Fdad0658b69914801aBaDA7Aa0Abb31653E5",
                nonce: consts_1.Chain.XDAI,
                feeMargin,
            },
            algorandParams: {
                algodApiKey: "e5b7d342b8a742be5e213540669b611bfd67465b754e7353eca8fd19b1efcffd",
                algodUri: "https://algorand-node.xp.network/",
                indexerUri: "https://algoexplorerapi.io/idx2",
                nonce: consts_1.Chain.ALGORAND,
                sendNftAppId: 458971166,
                algodPort: 443,
                notifier,
                feeMargin,
            },
            fuseParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.FUSE),
                erc721Minter: "0xC81D46c6F2D59182c5A64FD5C372266c98985AdF",
                erc1155Minter: "0x146a99Ff19ece88EC87f5be03085cA6CD3163E15",
                erc721_addr: "0x93239b1CF8CAd847f387735876EdBa7D75ae4f7A",
                erc1155_addr: "0x2496b44516c8639dA00E8D12ccE64862e3760190",
                minter_addr: "0xa66dA346C08dD77bfB7EE5E68C45010B6F2538ff",
                nonce: consts_1.Chain.FUSE,
                feeMargin,
            },
            tezosParams: {
                bridgeAddress: "KT1WKtpe58XPCqNQmPmVUq6CZkPYRms5oLvu",
                notifier,
                Tezos: new taquito_1.TezosToolkit(consts_1.MainNetRpcUri.TEZOS),
                xpnftAddress: "KT1NEx6MX2GUEKMTX9ydyu8mn9WBNEz3QPEp",
                validators: [
                    "tz1MwAQrsg5EgeFD1AQHT2FTutnj9yQJNcjM",
                    "tz1b5AMdXs9nDxsqoN9wa3HTusvhahgBRWuF",
                    "tz1L5DjmMEHbj5npRzZewSARLmTQQyESW4Mj",
                    "tz1csq1THV9rKQQexo2XfSjSEJEg2wRCSHsD",
                    "tz1TBhd1NeZNtWsTbecee8jDMDzeBNLmpViN",
                    "tz1SHcDnXRgb7kWidiaM2J6bbTS7x5jzBr67",
                ],
                feeMargin,
            },
            velasParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.VELAS),
                erc721Minter: "0x3F888c0Ee72943a3Fb1c169684A9d1e8DEB9f537",
                erc1155Minter: "0x0cC5F00e673B0bcd1F780602CeC6553aec1A57F0",
                erc721_addr: "0x9e5761f7A1360E8B3E9d30Ed9dd3161E8b75d4E8",
                erc1155_addr: "0x0B7ED039DFF2b91Eb4746830EaDAE6A0436fC4CB",
                minter_addr: "0x40d8160A0Df3D9aad75b9208070CFFa9387bc051",
                nonce: consts_1.Chain.VELAS,
                feeMargin,
            },
            iotexParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.IOTEX),
                minter_addr: "0x4bA4ADdc803B04b71412439712cB1911103380D6",
                erc721_addr: "0x6eD7dfDf9678eCb2051c46A1A5E38B4f310b18c5",
                erc721Minter: "0xD87755CCeaab0edb28b3f0CD7D6405E1bB827B65",
                erc1155Minter: "0x81e1Fdad0658b69914801aBaDA7Aa0Abb31653E5",
                erc1155_addr: "0x93Ff4d90a548143c28876736Aa9Da2Bb7B1b52D4",
                nonce: consts_1.Chain.IOTEX,
                feeMargin,
            },
            auroraParams: {
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.AURORA),
                minter_addr: "0x32E8854DC2a5Fd7049DCF10ef2cb5f01300c7B47",
                erc721_addr: "0x041AE550CB0e76a3d048cc2a4017BbCB74756b43",
                erc1155_addr: "0xca8E2a118d7674080d71762a783b0729AadadD42",
                erc1155Minter: "0x0000000000000000000000000000000000000000",
                erc721Minter: "0x0000000000000000000000000000000000000000",
                nonce: consts_1.Chain.AURORA,
                notifier,
                feeMargin,
            },
            godwokenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.GODWOKEN),
                minter_addr: "0x0000000000000000000000000000000000000000",
                erc721_addr: "0x0000000000000000000000000000000000000000",
                erc721Minter: "0x0000000000000000000000000000000000000000",
                erc1155Minter: "0x0000000000000000000000000000000000000000",
                nonce: consts_1.Chain.GODWOKEN,
                feeMargin,
            },
            gateChainParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.GATECHAIN),
                minter_addr: "0x0000000000000000000000000000000000000000",
                erc721_addr: "0x0000000000000000000000000000000000000000",
                erc721Minter: "0x0000000000000000000000000000000000000000",
                erc1155Minter: "0x0000000000000000000000000000000000000000",
                nonce: consts_1.Chain.GATECHAIN,
                feeMargin,
            },
        };
    };
})(ChainFactoryConfigs = exports.ChainFactoryConfigs || (exports.ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvZmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxZQUFZO0FBQ1osc0RBQThCO0FBQzlCLHNDQUFnRTtBQUNoRSxtQ0FBZ0M7QUFDaEMsOENBQWdEO0FBQ2hELDBDQUF5QztBQUN6QywwREFBMkQ7QUFDM0QsNERBQThDO0FBQzlDLGdFQUFzRDtBQUV0RCxNQUFNLGNBQWMsR0FBRztJQUNyQiw0Q0FBNEM7SUFDNUMsNENBQTRDO0lBQzVDLDRDQUE0QztJQUM1Qyw0Q0FBNEM7SUFDNUMsNENBQTRDO0lBQzVDLDRDQUE0QztJQUM1Qyw0Q0FBNEM7Q0FDN0MsQ0FBQztBQUVGLG9DQUFvQztBQUNwQyxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxLQUFLO0FBRUwsTUFBTSxjQUFjLEdBQUcsNkJBQTZCLENBQUM7QUFDckQsTUFBTSxzQkFBc0IsR0FBRyxrQ0FBa0MsQ0FBQztBQUVsRSxJQUFpQixtQkFBbUIsQ0F3YW5DO0FBeGFELFdBQWlCLG1CQUFtQjtJQUNyQiwyQkFBTyxHQUF3QyxLQUFLLElBQUksRUFBRTtRQUNyRSxNQUFNLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLHFCQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLHlCQUFTLENBQUMsc0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYztRQUN6QyxZQUFZO1FBQ1osSUFBSSxl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