import { Wallet as RawWallet } from '@prisma/client'
import { Wallet } from '../../../../application/entities/wallet';

export class PrismaWalletMapper {
    static toPrisma(wallet: Wallet): RawWallet {
        return {
            id: wallet.Id,
            balance: wallet.Balance,
            userId: wallet.UserId
        };
    }

    static toDomain(raw: RawWallet): Wallet {
        return new Wallet(
            {
                balance: raw.balance,
                userId: raw.userId
            },
            raw.id,
        );
    }
}
