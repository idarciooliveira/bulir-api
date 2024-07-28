import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { InvalidUserCredential } from "src/application/errors/error";
import { UserRepository } from "src/application/repositories/user-repository";

@Injectable()
export class AuthenticateUser {

    constructor(private userRepo: UserRepository) { }

    async execute(email: string, password: string) {

        const user = await this.userRepo.findByEmail(email)
        if (!user) throw new InvalidUserCredential()

        if (!await bcrypt.compare(password, user.Password))
            throw new InvalidUserCredential()

        return user
    }
}