import { Wallet } from "../entities/wallet";
import { WalletRepository } from "./wallet-repository";

export class InMemoryWalletRepository implements WalletRepository {

    public wallets: Wallet[] = []

    async getAll(): Promise<Wallet[]> {
        return this.wallets
    }

    async update(wallet: Wallet): Promise<void> {
        const index = this.wallets.findIndex(wallet => wallet.Id == wallet.Id)
        if (index >= 0) this.wallets[index] = wallet
    }

    async findByUserId(userId: string): Promise<Wallet> {
        return this.wallets.find(u => u.UserId === userId)
    }

    async save(wallet: Wallet): Promise<void> {
        this.wallets.push(wallet)
    }
}