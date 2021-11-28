/**
 * Web3 Implementation for cross chain traits
 * @module
 */
import BigNumber from "bignumber.js";
import { TransferForeign, UnfreezeForeign, UnfreezeForeignNft, BalanceCheck, TransferNftForeign, WrappedBalanceCheck, BatchWrappedBalanceCheck, MintNft, WrappedNftCheck, SignAndSend } from "./chain";
import { Signer, BigNumber as EthBN, PopulatedTransaction, Wallet, Transaction } from "ethers";
import { TransactionResponse, Provider } from "@ethersproject/providers";
import { ChainNonceGet, EstimateTxFees, ExtractAction, NftInfo, PreTransfer, ValidateAddress } from "..";
import { NftMintArgs } from "..";
declare type EasyBalance = string | number | EthBN;
/**
 * Information required to perform NFT transfers in this chain
 */
export declare type EthNftInfo = {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
};
/**
 * Arguments required for minting a new nft
 *
 * contract: address of the sc
 * token: token ID of the newly minted nft
 * owner: Owner of the newly minted nft
 * uri: uri of the nft
 */
export declare type MintArgs = {
    contract: string;
    uri: string;
};
export interface IsApproved<Sender> {
    isApprovedForMinter(address: NftInfo<EthNftInfo>, sender: Sender): Promise<boolean>;
}
export interface Approve<Sender> {
    approveForMinter(address: NftInfo<EthNftInfo>, sender: Sender): Promise<string | undefined>;
}
/**
 * Base util traits
 */
export declare type BaseWeb3Helper = BalanceCheck<string, BigNumber> & 
/**
 * Mint an nft in the given ERC1155 smart contract
 *
 * @argument signer  owner of the smart contract
 * @argument args  See [[MintArgs]]
 */
MintNft<Signer, NftMintArgs, string> & {
    /**
     *
     * Deploy an ERC721 smart contract
     *
     * @argument owner  Owner of this smart contract
     * @returns Address of the deployed smart contract
     */
    deployErc721(owner: Signer): Promise<string>;
};
/**
 * Traits implemented by this module
 */
export declare type Web3Helper = BaseWeb3Helper & WrappedBalanceCheck<string, BigNumber> & BatchWrappedBalanceCheck<string, BigNumber> & TransferForeign<Signer, string, BigNumber, Transaction> & TransferNftForeign<Signer, string, BigNumber, EthNftInfo, Transaction> & UnfreezeForeign<Signer, string, EasyBalance> & UnfreezeForeignNft<Signer, string, BigNumber, EthNftInfo, Transaction> & WrappedNftCheck<EthNftInfo> & EstimateTxFees<BigNumber> & ChainNonceGet & IsApproved<Signer> & Approve<Signer> & ValidateAddress & ExtractAction<TransactionResponse> & {
    createWallet(privateKey: string): Wallet;
} & Pick<PreTransfer<Signer, EthNftInfo>, "preTransfer"> & SignAndSend<Signer, PopulatedTransaction, TransactionResponse>;
/**
 * Create an object implementing minimal utilities for a web3 chain
 *
 * @param provider An ethers.js provider object
 */
export declare function baseWeb3HelperFactory(provider: Provider): Promise<BaseWeb3Helper>;
/**
 * Create an object implementing cross chain utilities for a web3 chain
 *
 * @param provider  An ethers.js provider object
 * @param minter_addr  Address of the minter smart contract
 * @param minter_abi  ABI of the minter smart contract
 */
export interface Web3Params {
    provider: Provider;
    minter_addr: string;
    erc1155_addr: string;
    erc721_addr: string;
    validators: string[];
    nonce: number;
}
export declare function web3HelperFactory(params: Web3Params): Promise<Web3Helper>;
export {};
