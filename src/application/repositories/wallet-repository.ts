import { Wallet } from "../entities/wallet";


export abstract class WalletRepository {
    abstract save(wallet: Wallet): Promise<void>
    abstract update(wallet: Wallet): Promise<void>
    abstract findByUserId(userId: string): Promise<Wallet | null>
    abstract getAll(): Promise<Wallet[]>
}