import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InvalidUserCredential } from "src/application/errors/error";
import { AuthenticateUser } from "src/application/usecases/users/authenticate-user";

export type ValidateUserProps = {
    email: string
    password: string
}

@Injectable()
export class AuthService {
    constructor(private authenticateUser: AuthenticateUser,
        private jwtService: JwtService) { }

    async validateUser({ email, password }: ValidateUserProps) {
        try {
            const user = await this.authenticateUser.execute(email, password)

            const payload = {
                userId: user.Id,
                role: user.Role
            }

            return {
                user: {
                    id: user.Id,
                    fullname: user.Fullname,
                    email: user.Email,
                    role: user.Role
                },
                token: this.jwtService.sign(payload),
            }

        } catch (error) {
            throw new InvalidUserCredential()
        }

    }
}