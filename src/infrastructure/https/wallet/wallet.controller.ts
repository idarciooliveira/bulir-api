import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreditUserWallet } from "src/application/usecases/wallet/credit-user-wallet";
import { GetWalletByUserId } from "src/application/usecases/wallet/get-wallet-by-userId";
import { JwtAuthGuard } from "src/infrastructure/auth/passport/jwt-auth.guard";
import { GetCurrentUserId } from "src/infrastructure/auth/rbac/user.decorator";
import { WalletViewModel } from "./wallet-view-model";
import { CreditDebtDto } from "./wallet.dto";

@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletController {
    constructor(private creditUserWallet: CreditUserWallet,
        private getWalletByUserId: GetWalletByUserId) { }


    @Post('/deposit')
    async creditWallet(@GetCurrentUserId() userId: string,
        @Body() body: CreditDebtDto) {
        await this.creditUserWallet.execute(userId, body.amount)
    }

    @Get('/balance')
    async findWalletByUserId(@GetCurrentUserId() userId: string) {
        const wallet = await this.getWalletByUserId.execute(userId)
        return WalletViewModel.toHTTP(wallet)
    }
}