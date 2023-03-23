"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idlFactory = void 0;
const idlFactory = ({ IDL }) => {
    const ValidateWhitelistDip721 = IDL.Record({
        dip_contract: IDL.Principal,
    });
    const ValidateCleanLogs = IDL.Record({ action_id: IDL.Nat });
    const ValidateTransferNft = IDL.Record({
        to: IDL.Principal,
        mint_with: IDL.Principal,
        token_url: IDL.Text,
    });
    const ValidateTransferNftBatch = IDL.Record({
        to: IDL.Principal,
        mint_with: IDL.Vec(IDL.Principal),
        token_urls: IDL.Vec(IDL.Text),
    });
    const ValidateUnfreezeNft = IDL.Record({
        to: IDL.Principal,
        dip_contract: IDL.Principal,
        token_id: IDL.Nat,
    });
    const ValidateUnfreezeNftBatch = IDL.Record({
        to: IDL.Principal,
        dip_contracts: IDL.Vec(IDL.Principal),
        token_ids: IDL.Vec(IDL.Nat),
    });
    const Config = IDL.Record({
        event_cnt: IDL.Nat,
        fee_public_key: IDL.Vec(IDL.Nat8),
        chain_nonce: IDL.Nat64,
        group_key: IDL.Vec(IDL.Nat8),
        paused: IDL.Bool,
    });
    const BridgeEventCtx = IDL.Record({
        to: IDL.Text,
        action_id: IDL.Nat,
        tx_fee: IDL.Nat64,
        chain_nonce: IDL.Nat64,
    });
    const UnfreezeNftBatch = IDL.Record({
        uris: IDL.Vec(IDL.Text),
        token_ids: IDL.Vec(IDL.Nat),
        burner: IDL.Principal,
    });
    const UnfreezeNft = IDL.Record({
        uri: IDL.Text,
        token_id: IDL.Nat,
        burner: IDL.Principal,
    });
    const TransferNft = IDL.Record({
        dip721_contract: IDL.Principal,
        token_id: IDL.Nat,
        mint_with: IDL.Text,
        token_data: IDL.Text,
    });
    const TransferNftBatch = IDL.Record({
        dip721_contract: IDL.Principal,
        token_datas: IDL.Vec(IDL.Text),
        mint_with: IDL.Text,
        token_ids: IDL.Vec(IDL.Nat),
    });
    const BridgeEvent = IDL.Variant({
        UnfreezeNftBatch: UnfreezeNftBatch,
        UnfreezeNft: UnfreezeNft,
        TransferNft: TransferNft,
        TransferNftBatch: TransferNftBatch,
    });
    const ValidateSetGroupKey = IDL.Record({ group_key: IDL.Vec(IDL.Nat8) });
    const ValidateSetPause = IDL.Record({ pause: IDL.Bool });
    const ValidateWithdrawFees = IDL.Record({ to: IDL.Principal });
    return IDL.Service({
        add_whitelist: IDL.Func([IDL.Nat, ValidateWhitelistDip721, IDL.Vec(IDL.Nat8)], [], []),
        clean_logs: IDL.Func([IDL.Nat, ValidateCleanLogs, IDL.Vec(IDL.Nat8)], [], []),
        encode_transfer_tx: IDL.Func([IDL.Nat8, IDL.Nat8, IDL.Text, IDL.Nat], [IDL.Vec(IDL.Nat8)], ["query"]),
        encode_validate_transfer_nft: IDL.Func([IDL.Nat, ValidateTransferNft], [IDL.Vec(IDL.Nat8)], ["query"]),
        encode_validate_transfer_nft_batch: IDL.Func([IDL.Nat, ValidateTransferNftBatch], [IDL.Vec(IDL.Nat8)], ["query"]),
        encode_validate_unfreeze_nft: IDL.Func([IDL.Nat, ValidateUnfreezeNft], [IDL.Vec(IDL.Nat8)], ["query"]),
        encode_validate_unfreeze_nft_batch: IDL.Func([IDL.Nat, ValidateUnfreezeNftBatch], [IDL.Vec(IDL.Nat8)], ["query"]),
        freeze_nft: IDL.Func([
            IDL.Nat64,
            IDL.Principal,
            IDL.Nat,
            IDL.Nat64,
            IDL.Text,
            IDL.Text,
            IDL.Vec(IDL.Nat8),
        ], [IDL.Nat], []),
        freeze_nft_batch: IDL.Func([
            IDL.Nat64,
            IDL.Principal,
            IDL.Vec(IDL.Nat),
            IDL.Nat64,
            IDL.Text,
            IDL.Text,
        ], [IDL.Nat], []),
        get_config: IDL.Func([], [Config], ["query"]),
        get_event: IDL.Func([IDL.Nat], [IDL.Opt(IDL.Tuple(BridgeEventCtx, BridgeEvent))], ["query"]),
        is_whitelisted: IDL.Func([IDL.Principal], [IDL.Bool], ["query"]),
        set_fee_group_key: IDL.Func([IDL.Nat, ValidateSetGroupKey, IDL.Vec(IDL.Nat8)], [], []),
        set_group_key: IDL.Func([IDL.Nat, ValidateSetGroupKey, IDL.Vec(IDL.Nat8)], [], []),
        set_pause: IDL.Func([IDL.Nat, ValidateSetPause, IDL.Vec(IDL.Nat8)], [], []),
        validate_transfer_nft: IDL.Func([IDL.Nat, ValidateTransferNft, IDL.Vec(IDL.Nat8)], [IDL.Nat32], []),
        validate_transfer_nft_batch: IDL.Func([IDL.Nat, ValidateTransferNftBatch, IDL.Vec(IDL.Nat8)], [], []),
        validate_unfreeze_nft: IDL.Func([IDL.Nat, ValidateUnfreezeNft, IDL.Vec(IDL.Nat8)], [], []),
        validate_unfreeze_nft_batch: IDL.Func([IDL.Nat, ValidateUnfreezeNftBatch, IDL.Vec(IDL.Nat8)], [], []),
        withdraw_fees: IDL.Func([IDL.Nat, ValidateWithdrawFees, IDL.Vec(IDL.Nat8)], [IDL.Nat64], []),
        withdraw_nft: IDL.Func([
            IDL.Nat64,
            IDL.Principal,
            IDL.Nat,
            IDL.Nat64,
            IDL.Text,
            IDL.Vec(IDL.Nat8),
        ], [IDL.Nat], []),
        withdraw_nft_batch: IDL.Func([IDL.Nat64, IDL.Principal, IDL.Vec(IDL.Nat), IDL.Nat64, IDL.Text], [IDL.Nat], []),
    });
};
exports.idlFactory = idlFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvZGZpbml0eS9pZGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBTyxFQUFFLEVBQUU7SUFDekMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3pDLFlBQVksRUFBRSxHQUFHLENBQUMsU0FBUztLQUM1QixDQUFDLENBQUM7SUFDSCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0QsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEVBQUUsRUFBRSxHQUFHLENBQUMsU0FBUztRQUNqQixTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7UUFDeEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJO0tBQ3BCLENBQUMsQ0FBQztJQUNILE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFNBQVM7UUFDakIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUNqQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQzlCLENBQUMsQ0FBQztJQUNILE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFNBQVM7UUFDakIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxTQUFTO1FBQzNCLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRztLQUNsQixDQUFDLENBQUM7SUFDSCxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDMUMs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