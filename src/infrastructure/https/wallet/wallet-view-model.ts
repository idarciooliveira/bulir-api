import { Wallet } from "../../../application/entities/wallet";

export class WalletViewModel {
    static toHTTP(wallet: Wallet) {
        return {
            id: wallet.Id,
            balance: wallet.Balance,
            userId: wallet.UserId
        };
    }
}
