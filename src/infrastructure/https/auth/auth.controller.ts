import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { LoginDto } from "./auth.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/authenticate')
    async authenticate(@Body() body: LoginDto) {
        return await this.authService.validateUser(body)
    }
}