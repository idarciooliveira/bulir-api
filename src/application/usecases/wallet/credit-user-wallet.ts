import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/application/errors/error";
import { WalletRepository } from "src/application/repositories/wallet-repository";


@Injectable()
export class CreditUserWallet {

    constructor(private walletRepo: WalletRepository) { }

    async execute(userId: string, amount: number) {
        const wallet = await this.walletRepo.findByUserId(userId)
        if (!wallet) throw new NotFoundError('Wallet')

        wallet.Balance = wallet.Balance + amount

        await this.walletRepo.update(wallet)
    }
}