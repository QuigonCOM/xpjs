/**
 * Transfer Liquidity to a foregin chain, freezing the original liquidity
 * 
 * @param sender  Account which owns the liquidity on the native chain, able to sign transactions
 * @param chain_nonce  Nonce of the target chain
 * @param to  Address of the receiver on the foreign chain
 * @param value  Amount of liquidity to send
 * 
 * @returns Transaction and the Identifier of this action to track the status
 */
export interface TransferForeign<Signer, ForeignAddr, Balance, Tx, EventIdent> {
  transferNativeToForeign(
    sender: Signer,
    chain_nonce: number,
    to: ForeignAddr,
    value: Balance
  ): Promise<[Tx, EventIdent]>;
}

/**
 * Unfreeze native liquidity existing on a foreign chain(Send back Liquidity)
 * 
 * @param sender  Account which owns the wrapped liquidity on this chain, able to sign transactions
 * @param chain_nonce  Nonce of the original chain
 * @param to  Address of the receiver on the original chain
 * @param value  Amount of liquidity to unfreeze
 * 
 * @returns Transaction and the Identifier of this action to track the status
 */
export interface UnfreezeForeign<Signer, ForeignAddr, Balance, Tx, EventIdent> {
  unfreezeWrapped(sender: Signer, chain_nonce: number, to: ForeignAddr, value: Balance): Promise<[Tx, EventIdent]>;
}

/**
 * Transfer NFT to a foreign chain, freezing the original one
 * 
 * @param sender  Account which owns the NFT on the native chain, able to sign transactions
 * @param chain_nonce  Nonce of the target chain
 * @param to  Address of the receiver on the foreign chain
 * @param id  Information required to freeze this nft
 * 
 * @returns Transaction and the Identifier of this action to track the status
 */
export interface TransferNftForeign<Signer, ForeignAddr, NftIdent, Tx, EventIdent> {
  transferNftToForeign(
    sender: Signer,
    chain_nonce: number,
    to: ForeignAddr,
    id: NftIdent
  ): Promise<[Tx, EventIdent]>;
}

/**
 * Unfreeze native NFT existing on a foreign chain(Send back NFT)
 * chain_nonce is automatically derived
 * 
 * @param sender  Account which owns the wrapped NFT on this chain, able to sign transactions
 * @param to  Address of the receiver on the original chain
 * @param id  Information required to unfreeze this nft
 * 
 * @returns Transaction and the Identifier of this action to track the status
 */
export interface UnfreezeForeignNft<Signer, ForeignAddr, NftIdent, Tx, EventIdent> {
  unfreezeWrappedNft(
    sender: Signer,
    to: ForeignAddr,
    id: NftIdent
  ): Promise<[Tx, EventIdent]>;
}

/**
 * Get the balance of an address on the chain
 */
export interface BalanceCheck<Addr, Balance> {
  balance(
    address: Addr
  ): Promise<Balance>;
}

/**
 * Create a new NFT on this chain
 * 
 * @param options Arguments required to mint the nft
 */
export interface MintNft<Signer, Args, Identifier> {
  mintNft(
    owner: Signer,
    options: Args
  ): Promise<Identifier>
}

/**
 * Get the list of NFTs for a given account
 */
export interface ListNft<Addr, K, V> {
  listNft(
    owner: Addr
  ): Promise<Map<K, V>>
}

/**
 * Get the original data of a locked NFT (uri, name, etc)
 */
export interface GetLockedNft<Ident, Info> {
	getLockedNft(ident: Ident): Promise<Info | undefined>;
}
