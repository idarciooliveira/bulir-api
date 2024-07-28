import { Injectable } from "@nestjs/common";
import { BadRequestError, NotFoundError } from "src/application/errors/error";
import { WalletRepository } from "src/application/repositories/wallet-repository";


@Injectable()
export class DeductUserWallet {

    constructor(private walletRepo: WalletRepository) { }

    async execute(userId: string, amount: number) {
        const wallet = await this.walletRepo.findByUserId(userId)
        if (!wallet) throw new NotFoundError('Wallet')

        if (amount > wallet.Balance)
            throw new BadRequestError('Insufficient funds. Please add more funds to your wallet to complete the transaction!')

        wallet.Balance -= amount

        await this.walletRepo.update(wallet)
    }
}