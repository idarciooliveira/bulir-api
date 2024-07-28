import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/application/errors/error";
import { WalletRepository } from "src/application/repositories/wallet-repository";


@Injectable()
export class GetWalletByUserId {

    constructor(private walletRepo: WalletRepository) { }

    async execute(userId: string) {
        const wallet = await this.walletRepo.findByUserId(userId)
        if (!wallet) throw new NotFoundError('Wallet')
        return wallet
    }
}