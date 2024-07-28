import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/application/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { WalletRepository } from "src/application/repositories/wallet-repository";
import { PrismaWalletRepository } from "./prisma/repositories/prisma-wallet-repository";
import { ServiceRepository } from "src/application/repositories/service-repository";
import { PrismaServiceRepository } from "./prisma/repositories/prisma-service-repository";
import { BookingRepository } from "src/application/repositories/booking-repository";
import { PrismaBookingRepository } from "./prisma/repositories/prisma-booking-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: WalletRepository,
            useClass: PrismaWalletRepository
        },
        {
            provide: ServiceRepository,
            useClass: PrismaServiceRepository
        },
        {
            provide: BookingRepository,
            useClass: PrismaBookingRepository
        }
    ],
    exports: [
        UserRepository,
        WalletRepository,
        ServiceRepository,
        BookingRepository
    ],
})

export class DatabaseModule { }