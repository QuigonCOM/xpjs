import { CasperClient } from "casper-js-sdk";
import { BalanceCheck, ChainNonceGet, EstimateTxFees, FeeMargins, GetExtraFees, GetFeeMargins, GetProvider, MintNft, NftInfo, PreTransfer, TransferNftForeign, UnfreezeForeignNft, ValidateAddress } from "./chain";
import { CasperLabsHelper } from "casper-js-sdk/dist/@types/casperlabsSigner";
import { AsymmetricKey } from "casper-js-sdk/dist/lib/Keys";
import { EvNotifier } from "../services/notifier";
import { SignatureService } from "../services/estimator";
export interface CasperParams {
    rpc: string;
    network: string;
    bridge: string;
    notifier: EvNotifier;
    xpnft: string;
    umt: string;
    feeMargin: FeeMargins;
    sig: SignatureService;
}
export interface CasperNFT {
    tokenId?: string;
    tokenHash?: string;
    contract: string;
}
export interface CasperMintNft {
    contract?: string;
    collectionName: string;
    uri: string;
}
export type CasperHelper = ChainNonceGet & BalanceCheck & Pick<PreTransfer<CasperLabsHelper, CasperNFT, string, undefined>, "preTransfer"> & ValidateAddress & GetFeeMargins & GetProvider<CasperClient> & {
    isApprovedForMinter(sender: CasperLabsHelper, nft: NftInfo<CasperNFT>): Promise<boolean>;
} & TransferNftForeign<CasperLabsHelper, CasperNFT, string> & UnfreezeForeignNft<CasperLabsHelper, CasperNFT, string> & EstimateTxFees<CasperNFT> & {
    XpNft: string;
} & GetExtraFees & MintNft<CasperLabsHelper, CasperMintNft, string>;
export declare function casperHelper({ rpc, network, bridge, feeMargin, xpnft, umt, sig, }: CasperParams): Promise<CasperHelper>;
export declare function CasperHelperFromKeys(keys: AsymmetricKey): CasperLabsHelper;
//# sourceMappingURL=casper.d.ts.map