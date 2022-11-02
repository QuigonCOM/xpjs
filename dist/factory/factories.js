"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const hethers_1 = require("@hashgraph/hethers");
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
const tonweb_1 = __importDefault(require("tonweb"));
/*const EVM_VALIDATORS = [
  "0xffa74a26bf87a32992bb4be080467bb4a8019e00",
  "0x837b2eb764860b442c971f98f505e7c5f419edd7",
  "0x9671ce5a02eb53cf0f2cbd220b34e50c39c0bf23",
  "0x90e79cc7a06dbd227569920a8c4a625f630d77f4",
  "0xdc80905cafeda39cb19a566baeef52472848e82f",
  "0x77745cd585798e55938940e3d4dd0fd7cde7bdd6",
  "0xc2a29b4e9fa71e9033a52611544403241c56ac5e",
];*/
// const _EVM_TESTNET_VALIDATORS = [
//   "0x50aCEC08ce70aa4f2a8ab2F45d8dCd1903ea4E14",
//   "0xae87208a5204B6606d3AB177Be5fdf62267Cd499",
//   "0x5002258315873AdCbdEF25a8E71C715A4f701dF5",
// ];
const middleware_uri = "https://notifier.xp.network";
const testnet_middleware_uri = "https://testnet-notifier.xp.network/notify-test/";
var ChainFactoryConfigs;
(function (ChainFactoryConfigs) {
    ChainFactoryConfigs.TestNet = async () => {
        const feeMargin = { min: 1, max: 5 };
        const notifier = (0, notifier_1.evNotifier)(testnet_middleware_uri);
        // VeChain related:
        const net = new connex_driver_1.SimpleNet(consts_1.TestNetRpcUri.VECHAIN);
        const driver = await connex_driver_1.Driver.connect(net);
        const provider = thor.ethers.modifyProvider(new ethers_1.ethers.providers.Web3Provider(new thor.ConnexProvider({ connex: new connex_framework_1.Framework(driver) })));
        return {
            elrondParams: {
                node_uri: consts_1.TestNetRpcUri.ELROND,
                minter_address: "erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f",
                esdt_swap_address: "erd1qqqqqqqqqqqqqpgqc854pa9ruzgs5f8rdzzc02xgq8kqku3ng6vs59vmf8",
                esdt_nft: "XPNFT-af3fde",
                esdt_swap: "WEGLD-708f9b",
                notifier,
                nonce: 2,
                feeMargin,
            },
            vechainParams: {
                notifier,
                feeMargin,
                nonce: consts_1.Chain.VECHAIN,
                provider,
                minter_addr: "0x4096e08C5d6270c8cd873daDbEAB575670aad8Bc",
                erc721_addr: "0x39737B28d02d170Cb7a6141BA55F039104b3Fce9",
                erc1155_addr: "0x9Db78e8750de28B0f08F866d6a54FAd34FF19da6",
                erc721Minter: "0x38d2A286BF1d7567129506527B7ced29bb42772b",
                erc1155Minter: "0x9Db78e8750de28B0f08F866d6a54FAd34FF19da6",
            },
            tronParams: {
                provider: new tronweb_1.default({ fullHost: consts_1.TestNetRpcUri.TRON }),
                notifier,
                minter_addr: "TY46GA3GGdMtu9GMaaSPPSQtqq9CZAv5sK",
                erc721_addr: "TDhb2kyurMwoc1eMndKzqNebji1ap1DJC4",
                erc1155_addr: "TBeSKv5RSFLAi7SCD7hR64xuvP6N26oEqR",
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
                minter_addr: "0xDdF1f6B8Ae8cd26dBE7C4C3ed9ac8E6D8B3a4FdC",
                erc721_addr: "0xE1D8Df2e06797F22e7ce25c95A7ddccb926f8A1E",
                erc1155Minter: "0xfA9214AEe59a6631A400DC039808457524dE70A2",
                erc721Minter: "0x54Db938575DD089702822F191AEbB25C2Af7D1Ef",
                erc1155_addr: "0xfA9214AEe59a6631A400DC039808457524dE70A2",
                nonce: consts_1.Chain.AVALANCHE,
                feeMargin,
            },
            polygonParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.POLYGON),
                minter_addr: "0x224f78681099D66ceEdf4E52ee62E5a98CCB4b9e",
                erc721_addr: "0xb678b13E41a47e46A4046a4D8315b32E0F34389c",
                erc1155Minter: "0x5A768f8dDC67ccCA1431879BcA28E93a6c7722bb",
                erc1155_addr: "0xc1D778Ce89154357471bA6c4C6E51f0e590FFe57",
                erc721Minter: "0x6516E2D3387A9CF4E5e868E7842D110c95A9f3B4",
                nonce: consts_1.Chain.POLYGON,
                feeMargin,
            },
            dfinityParams: {
                agent: new agent_1.HttpAgent({
                    host: "https://ic0.app",
                }),
                bridgeContract: principal_1.Principal.fromText("e3io4-qaaaa-aaaak-qasua-cai"),
                xpnftId: principal_1.Principal.fromText("e4jii-5yaaa-aaaak-qasuq-cai"),
                umt: principal_1.Principal.fromText("evkdu-lqaaa-aaaak-qasva-cai"),
                notifier,
                feeMargin,
            },
            moonbeamParams: {
                nonce: consts_1.Chain.MOONBEAM,
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.MOONBEAM),
                erc721Minter: "0x1F71E80E1E785dbDB34c69909C11b71bAd8D9802",
                erc1155Minter: "0x10E3EE8526Cc7610393E2f6e25dEee0bD38d057e",
                erc1155_addr: "0xd023739a76Df4cC6260A1Ba25e8BEbCe8389D60D",
                erc721_addr: "0x42027aF22E36e839e138dc387F1b7428a85553Cc",
                minter_addr: "0x0F00f81162ABC95Ee6741a802A1218C67C42e714",
            },
            abeyChainParams: {
                nonce: consts_1.Chain.ABEYCHAIN,
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.ABEYCHAIN),
                erc721Minter: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                erc1155Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc1155_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                erc721_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                minter_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
            },
            fantomParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.FANTOM),
                minter_addr: "0x9a287810bA8F0564DaDd9F2Ea9B7B2459497416B",
                erc721_addr: "0x3F51015C76D7A64514E9B86D500bBFD44F95bdE9",
                erc1155Minter: "string",
                erc1155_addr: "0xE657b66d683bF4295325c5E66F6bb0fb6D1F7551",
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
                erc1155_addr: "0xb5278A4808e2345A3B9d08bAc8909A121aFaEBB3",
                nonce: consts_1.Chain.BSC,
                feeMargin,
            },
            celoParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.CELO),
                minter_addr: "0x9a287810bA8F0564DaDd9F2Ea9B7B2459497416B",
                erc721_addr: "0x3F51015C76D7A64514E9B86D500bBFD44F95bdE9",
                erc1155_addr: "",
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
                erc1155_addr: "0x44FCF0001A2B03260e4Bba44AF93a60C64cE79A2",
                nonce: consts_1.Chain.HARMONY,
                feeMargin,
            },
            ropstenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.ROPSTEN),
                erc1155_addr: "0x46Df0d0Dd629d61BDFA567dE61912FDeD883A60d",
                erc721_addr: "0x33DC209D33AddF60cf90Dd4B10f9a198A1A93f63",
                erc1155Minter: "0xE90105827d04522e52AdfA6BF695730E5706C0C2",
                erc721Minter: "0x90d38996B210D45bDF2FD54d091C6061dff0dA9F",
                minter_addr: "0x04a5f9158829Cae5a0a549954AdEaBD47BbB3d2d",
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
                erc1155_addr: "0x1C6d7aa611B30C9C1e5f52068E145b77b0e661b2",
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
                erc1155_addr: "",
                erc721Minter: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                nonce: consts_1.Chain.AURORA,
                feeMargin,
            },
            uniqueParams: {
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.UNIQUE),
                nonce: consts_1.Chain.UNIQUE,
                erc721_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                erc1155_addr: "",
                minter_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                erc1155Minter: "string",
                erc721Minter: "string",
                notifier,
                feeMargin,
            },
            tezosParams: {
                bridgeAddress: "KT1KbL9kWPM8GkMr5M38vF1eHdsNxTc4WkyQ",
                notifier,
                Tezos: new taquito_1.TezosToolkit(consts_1.TestNetRpcUri.TEZOS),
                xpnftAddress: "KT1WR4fe9wFGPgNViK5feigMGyXKG9gCX8n4",
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
                erc1155_addr: "0x5D822bA2a0994434392A0f947C83310328CFB0DE",
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
                erc1155_addr: "0x46Df0d0Dd629d61BDFA567dE61912FDeD883A60d",
                erc1155Minter: "0x5df32A2F15D021DeF5086cF94fbCaC4594208A26",
                erc721Minter: "0xC3dB3dBcf007961541BE1ddF15cD4ECc0Fc758d5",
                nonce: consts_1.Chain.IOTEX,
                feeMargin,
            },
            hederaParams: {
                notifier,
                provider: hethers_1.hethers.getDefaultProvider("testnet"),
                feeMargin,
                nonce: consts_1.Chain.HEDERA,
                erc721_addr: "0x0000000000000000000000000000000002e87622",
                erc1155_addr: "0x0000000000000000000000000000000002e87622",
                minter_addr: "0x0000000000000000000000000000000002e86d67",
                erc721Minter: "0x0000000000000000000000000000000002da3c1d",
                erc1155Minter: "0x0000000000000000000000000000000002da3c20",
            },
            skaleParams: {
                nonce: consts_1.Chain.SKALE,
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.SKALE),
                feeMargin,
                erc1155_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                erc1155Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc721Minter: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                erc721_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                minter_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
            },
            godwokenParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.TestNetRpcUri.GODWOKEN),
                minter_addr: "0x3fe9EfFa80625B8167B2F0d8cF5697F61D77e4a2",
                erc721_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                erc1155_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
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
                erc1155_addr: "0x8CEe805FE5FA49e81266fcbC27F37D85062c1707",
                erc721Minter: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc1155Minter: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                nonce: consts_1.Chain.GATECHAIN,
                feeMargin,
            },
            secretParams: {
                notifier,
                rpcUrl: consts_1.TestNetRpcUri.SECRET,
                bridge: {
                    contractAddress: "secret1ecsxtsrct6h647lpztnnzc9e47ezh0uu673c8h",
                    codeHash: "29a127369d1f4326fb684435fde702fa9619c812dfb5b3a1929529bab0e308e0",
                },
                xpnft: {
                    contractAddress: "secret1x4afa2shvq4uwwtl0ld8qnjfm3jkmyvap3yn9g",
                    codeHash: "090ab9b7968745369f8888302a16650164e2ffc2f44c393a7382f74e122a9a8e",
                },
                umt: {
                    contractAddress: "secret146snljq0kjsva7qrx4am54nv3fhfaet7srx4n2",
                    codeHash: "af076a49141264ec048270318f1358c9be193893c3f829425cab53ee5eb05e5c",
                },
                chainId: "24",
                feeMargin,
            },
            nearParams: {
                networkId: "testnet",
                nonce: consts_1.Chain.NEAR,
                rpcUrl: consts_1.TestNetRpcUri.NEAR,
                bridge: "xp_bridge_1.testnet",
                xpnft: "xp_nft_1.testnet",
                feeMargin,
                notifier,
            },
        };
    };
    ChainFactoryConfigs.Staging = async () => {
        const feeMargin = { min: 1, max: 5 };
        const notifier = (0, notifier_1.evNotifier)("https://bridge1.xp.network/notifier");
        return {
            tonParams: {
                bridgeAddr: "kQD3Fic8toRl0SIMswto8wmy5H41CDZUGAIyIK95Al5BBUiX",
                burnerAddr: "kQBCnW4TO466p7YzKGZebnsylUSHTyxTKuwMDXo5JEQbIEOF",
                notifier,
                tonweb: new tonweb_1.default(new tonweb_1.default.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
                    apiKey: "05645d6b549f33bf80cee8822bd63df720c6781bd00020646deb7b2b2cd53b73",
                })),
                xpnftAddr: "EQCgk1I2zujGrXaNXnWZEtFD93tSKNjvRfqKV0xp7EswHgw9",
                feeMargin,
            },
            secretParams: {
                bridge: {
                    contractAddress: "secret1t0g8tvc0tyvpwdsdc5zepa9j2ptr3vfte26qhu",
                    codeHash: "684afe616d92b29c097c5f00365d07c005e99c90ff1227507a0284b601a2cc5e",
                },
                xpnft: {
                    contractAddress: "secret1ggvqzks96k7hawhdx3harrtnffhttrrq2qxmdg",
                    codeHash: "b7f44f7d2f72bfec52b027ee6b3ef802246735b50b2bfe747851876f818d7f45",
                },
                notifier,
                rpcUrl: consts_1.MainNetRpcUri.SECRET,
                umt: {
                    contractAddress: "",
                    codeHash: "",
                },
                chainId: "24",
                feeMargin,
            },
            abeyChainParams: {
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.ABEYCHAIN),
                erc1155_addr: "0x8776073043eef8929F4a9cBa8Aacc6B59A21BA52",
                erc1155Minter: "0x5Ed657a379e06CBAc1Ba1a9cF6D28e71c66B0c83",
                erc721_addr: "0x3C8C51809Ee58E9D3BA37e37112843e41DcBD7B7",
                erc721Minter: "0xD580913Ef2c8CA4Ca90D4bE6851ACa004cf586D8",
                minter_addr: "0x14db0f56042Fa87F3b3921E871f87248f4C56A71",
                nonce: consts_1.Chain.ABEYCHAIN,
            },
            moonbeamParams: {
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.MOONBEAM),
                erc1155_addr: "0x55B1D1891ABb21A5d245d149B49007b55Bd3746D",
                erc721_addr: "0x4ceDb46481d7118E1D292C318E37510E5919bBe6",
                erc1155Minter: "0xF9DfD29ddEDEa3224f9c7E12c7Bbe37101341786",
                erc721Minter: "0x35c3c3959d19A310Fc052545fCC29200dc440CdA",
                minter_addr: "0x8B7f2bC31976230E374B93DF88D6eCD14f7B5D7F",
                nonce: consts_1.Chain.MOONBEAM,
            },
            polygonParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.POLYGON),
                erc721Minter: "0x88B830293D4B25dBDAF97A88dc188Fbf1d41F5C8",
                erc1155Minter: "0xCb83A7Db754F2586DB00384E4dd317D9Dd86913c",
                erc721_addr: "0x2d6907df316D5960e9064412a71810A7c9D8f4c7",
                erc1155_addr: "0xb35fF4cC9311324bb8DED72331498994f764Fe0f",
                minter_addr: "0x8BD036a8a60b39cbAd5CBbf30E04dbe91FbeFc94",
                nonce: consts_1.Chain.POLYGON,
                feeMargin,
            },
            aptosParams: {
                rpcUrl: consts_1.MainNetRpcUri.APTOS,
                bridge: "0xf1528ec9c413e37f0ce63eb699fa6c7521b925ff4857b2c95e857e43078c916d",
                xpnft: "XPNFT",
                notifier,
                feeMargin,
                nonce: consts_1.Chain.APTOS,
            },
        };
    };
    ChainFactoryConfigs.MainNet = async () => {
        const feeMargin = { min: 1, max: 5 };
        const notifier = (0, notifier_1.evNotifier)(middleware_uri);
        // VeChain related:
        const net = new connex_driver_1.SimpleNet(consts_1.MainNetRpcUri.VECHAIN);
        const driver = await connex_driver_1.Driver.connect(net);
        const provider = thor.ethers.modifyProvider(new ethers_1.ethers.providers.Web3Provider(new thor.ConnexProvider({ connex: new connex_framework_1.Framework(driver) })));
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
            dfinityParams: {
                agent: new agent_1.HttpAgent({
                    host: "https://ic0.app",
                }),
                bridgeContract: principal_1.Principal.fromText("e3io4-qaaaa-aaaak-qasua-cai"),
                xpnftId: principal_1.Principal.fromText("e4jii-5yaaa-aaaak-qasuq-cai"),
                umt: principal_1.Principal.fromText("evkdu-lqaaa-aaaak-qasva-cai"),
                notifier,
                feeMargin,
            },
            vechainParams: {
                notifier,
                feeMargin,
                nonce: consts_1.Chain.VECHAIN,
                provider,
                minter_addr: "0xE860cef926E5e76E0E88fdc762417a582F849C27",
                erc721_addr: "0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271",
                erc1155_addr: "",
                erc721Minter: "0x6e2B43FeF2E750e1562AC572e60B6C484a027424",
                erc1155Minter: "0x4E3a506800b894f3d7B46475Ab693DD5a567bB5C",
            },
            tronParams: {
                provider: new tronweb_1.default({ fullHost: consts_1.MainNetRpcUri.TRON }),
                notifier,
                minter_addr: "TAncANF5aYbvgXDatmwTdvTa5N9PTrq95k",
                erc721_addr: "TVdp7szDHg3opRyuciQaJi93LLk7y83hrC",
                erc1155_addr: "",
                erc1155Minter: "TYoj1JVpJt1TAWBFj3GkaKLC2vrcFnjZ1G",
                erc721Minter: "TPSQTbFWaxiDZbGD7MoqR6N2aWDSWBUNfA",
                validators: [
                    "TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo",
                    "TN9bHXEWditocT4Au15mgm7JM56XBnRCvm",
                    "TRHLhivxVogGhtxKn6sC8UF2Fr3WBdaT8N",
                    "TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo",
                    "TN9bHXEWditocT4Au15mgm7JM56XBnRCvm",
                    "TRHLhivxVogGhtxKn6sC8UF2Fr3WBdaT8N",
                    "TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo",
                ],
                nonce: consts_1.Chain.TRON,
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
                erc1155_addr: "",
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
                indexerUri: "https://algoindexer.algoexplorerapi.io",
                nonce: consts_1.Chain.ALGORAND,
                sendNftAppId: 769053604,
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
                minter_addr: "0xeBCDdF17898bFFE81BCb3182833ba44f4dB25525",
                erc721_addr: "0x9cdda01E00A5A425143F952ee894ff99B5F7999F",
                erc1155_addr: "0x34933A5958378e7141AA2305Cdb5cDf514896035",
                erc721Minter: "0x0000000000000000000000000000000000000000",
                erc1155Minter: "0x0000000000000000000000000000000000000000",
                nonce: consts_1.Chain.GODWOKEN,
                feeMargin,
            },
            gateChainParams: {
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.GATECHAIN),
                minter_addr: "0xFc7f7fD2DBdAF6D8F3ee3f222b3a6a9f89729f05",
                erc721_addr: "0xD6939f722B977afd7DD934A31bc94d08d4ea4336",
                erc1155_addr: "",
                erc1155Minter: "0xc45759e51CdDBa46db4D1becC8B8Bcbe5d4a9bB4",
                erc721Minter: "0x0000000000000000000000000000000000000000",
                nonce: consts_1.Chain.GATECHAIN,
                feeMargin,
            },
            skaleParams: {
                nonce: consts_1.Chain.SKALE,
                notifier,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.SKALE),
                feeMargin,
                erc1155_addr: "0x48B218C9f626F079b82f572E3c5B46251c40fc47",
                erc1155Minter: "0xaB9eD7b9734471249255B4d969B32995015116d9",
                erc721Minter: "0x0F00f81162ABC95Ee6741a802A1218C67C42e714",
                erc721_addr: "0x57d2Ad1a14C77627D5f82B7A0F244Cfe391e59C5",
                minter_addr: "0xbED4a5b36fae07943589a0b34CC2Ec3a1c208E53",
            },
            moonbeamParams: {
                nonce: consts_1.Chain.MOONBEAM,
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.MOONBEAM),
                erc721Minter: "",
                erc1155Minter: "",
                erc1155_addr: "0xe535A8De7C42a8bc1633f16965fbc259a3Ef58B6",
                erc721_addr: "0xfD3Ce0a10D4731b136a7C9e3f8a37edA1EFbf77f",
                minter_addr: "0xBA3Cc81cfc54a4ce99638b5da1F17b15476E7231",
            },
            abeyChainParams: {
                nonce: consts_1.Chain.ABEYCHAIN,
                notifier,
                feeMargin,
                provider: new ethers_1.ethers.providers.JsonRpcProvider(consts_1.MainNetRpcUri.ABEYCHAIN),
                erc721Minter: "0xBb5e9896cEe600DaC470775B6f235Db105E861BD",
                erc1155Minter: "0x35c3c3959d19A310Fc052545fCC29200dc440CdA",
                erc1155_addr: "0xF9DfD29ddEDEa3224f9c7E12c7Bbe37101341786",
                erc721_addr: "0x55B1D1891ABb21A5d245d149B49007b55Bd3746D",
                minter_addr: "0x4ceDb46481d7118E1D292C318E37510E5919bBe6",
            },
            secretParams: {
                notifier,
                rpcUrl: consts_1.MainNetRpcUri.SECRET,
                bridge: {
                    contractAddress: "secret18f66qjjuyudmh7q6s50hwpt9y679lanjs82jkg",
                    codeHash: "224f175c92947bbfd656d26e21b5eee40f73eac6aa6b64c328db3c55261ee6b4",
                },
                xpnft: {
                    contractAddress: "secret16zcej6asqrtfq08u3fdjhs03zpl7lgy7q32eps",
                    codeHash: "b7f44f7d2f72bfec52b027ee6b3ef802246735b50b2bfe747851876f818d7f45",
                },
                umt: {
                    contractAddress: "",
                    codeHash: "",
                },
                chainId: "24",
                feeMargin,
            },
            nearParams: {
                networkId: "mainnet",
                nonce: consts_1.Chain.NEAR,
                rpcUrl: consts_1.MainNetRpcUri.NEAR,
                bridge: "",
                xpnft: "",
                feeMargin,
                notifier,
            },
        };
    };
})(ChainFactoryConfigs = exports.ChainFactoryConfigs || (exports.ChainFactoryConfigs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3RvcnkvZmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsWUFBWTtBQUNaLHNEQUE4QjtBQUM5QixzQ0FBZ0U7QUFDaEUsbUNBQWdDO0FBQ2hDLDhDQUFnRDtBQUNoRCwwQ0FBeUM7QUFDekMsMERBQTJEO0FBQzNELDREQUE4QztBQUM5QyxnRUFBc0Q7QUFDdEQsZ0RBQTZDO0FBQzdDLDBDQUEyQztBQUMzQyxrREFBK0M7QUFDL0Msb0RBQTRCO0FBRzVCOzs7Ozs7OztJQVFJO0FBRUosb0NBQW9DO0FBQ3BDLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELEtBQUs7QUFFTCxNQUFNLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQztBQUNyRCxNQUFNLHNCQUFzQixHQUMxQixrREFBa0QsQ0FBQztBQUVyRCxJQUFpQixtQkFBbUIsQ0F3c0JuQztBQXhzQkQsV0FBaUIsbUJBQW1CO0lBQ3JCLDJCQUFPLEdBQXdDLEtBQUssSUFBSSxFQUFFO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBQSxxQkFBVSxFQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFcEQsbUJBQW1CO1FBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUkseUJBQVMsQ0FBQyxzQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3pDLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQy9CLElBQUksSUFB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