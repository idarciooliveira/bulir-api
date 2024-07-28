import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { WalletRepository } from "src/application/repositories/wallet-repository";
import { Wallet } from "src/application/entities/wallet";
import { PrismaWalletMapper } from "../mappers/prisma-wallet-mapper";


@Injectable()
export class PrismaWalletRepository implements WalletRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async update(wallet: Wallet): Promise<void> {
        const raw = PrismaWalletMapper.toPrisma(wallet)
        await this.prismaService.wallet.update({
            data: raw,
            where: {
                id: raw.id
            }
        })
    }

    async findByUserId(userId: string): Promise<Wallet> {
        const wallet = await this.prismaService.wallet.findFirst({
            where: {
                userId
            }
        })

        return PrismaWalletMapper.toDomain(wallet)
    }

    async save(wallet: Wallet): Promise<void> {
        const raw = PrismaWalletMapper.toPrisma(wallet)
        await this.prismaService.wallet.create({
            data: raw
        })
    }

    async findById(id: string): Promise<Wallet> {
        const wallet = await this.prismaService.wallet.findUnique({
            where: {
                id
            }
        })

        return PrismaWalletMapper.toDomain(wallet)
    }
    async getAll(): Promise<Wallet[]> {
        const wallets = await this.prismaService.wallet.findMany()
        return wallets.map(PrismaWalletMapper.toDomain)
    }
}