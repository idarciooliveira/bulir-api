import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthenticateUser } from "src/application/usecases/users/authenticate-user";
import { CreateUser } from "src/application/usecases/users/create-user";
import { GetUserById } from "src/application/usecases/users/get-user-by-id";
import { GetUsers } from "src/application/usecases/users/get-users";
import { UserController } from "./users/user.controller";
import { AuthModule } from "../auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { WalletController } from "./wallet/wallet.controller";
import { CreditUserWallet } from "src/application/usecases/wallet/credit-user-wallet";
import { GetWalletByUserId } from "src/application/usecases/wallet/get-wallet-by-userId";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [
        UserController,
        AuthController,
        WalletController
    ],
    providers: [
        AuthenticateUser,
        CreateUser,
        GetUserById,
        GetUsers,
        CreditUserWallet,
        GetWalletByUserId
    ]
})

export class HttpModule { }