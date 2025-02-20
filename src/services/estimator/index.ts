import axios from "axios";
import { ChainNonce } from "../../type-utils";

export interface SignatureService {
  getSignatureNear(
    from: ChainNonce,
    toChain: ChainNonce,
    nft: string,
    tokenContract: string,
    tokenId: string,
    to: string
  ): Promise<SignatureServiceResponse>;
  getSignatureDfinity(
    fc: ChainNonce,
    tc: ChainNonce,
    to: string,
    num: number
  ): Promise<SignatureServiceResponse>;
  casper(
    from: ChainNonce,
    to: ChainNonce,
    receiver: string,
    contract: string,
    token_id: string
  ): Promise<SignatureServiceResponse>;
}

interface SignatureServiceResponse {
  signature: string;
  fee: string;
  fees?: string;
  sig?: string;
}

export function signatureService(url: string): SignatureService {
  const signer = axios.create({
    baseURL: url,
  });
  return {
    async getSignatureNear(
      fromChain: ChainNonce,
      toChain: ChainNonce,
      _nft: string,
      tokenContract: string,
      tokenId: string,
      to: string
    ) {
      const result = await signer.post<{
        data: SignatureServiceResponse;
      }>("/api/near/", {
        from: fromChain,
        to: toChain,
        receiver: to,
        nft: {
          token_id: tokenId,
          contract: tokenContract,
        },
      });
      console.log("near signature response", result);
      return result.data.data;
    },
    async getSignatureDfinity(fc, tc, to, num: number) {
      const result = await signer.post<{
        data: SignatureServiceResponse;
      }>("/api/dfinity/", {
        from: fc,
        to: tc,
        receiver: to,
        num,
      });
      return result.data.data;
    },
    async casper(from, to, receiver, contract, token_id) {
      const result = await signer.post<{
        data: SignatureServiceResponse;
      }>("/api/casper/", {
        from,
        to,
        receiver,
        nft: {
          token_id,
          contract,
        },
      });
      return result.data.data;
    },
  };
}
