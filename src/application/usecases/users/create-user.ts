import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { User } from "src/application/entities/user";
import { Wallet } from "src/application/entities/wallet";
import { AlreadyExistError } from "src/application/errors/error";
import { UserRepository } from "src/application/repositories/user-repository";
import { WalletRepository } from "src/application/repositories/wallet-repository";

type CreateUserProps = {
    fullname: string
    nif: string
    email: string
    password: string
    role: string
}

@Injectable()
export class CreateUser {

    constructor(private userRepo: UserRepository,
        private walletRepo: WalletRepository) { }

    async execute(props: CreateUserProps) {

        console.log(props)
        if (await this.userRepo.findByEmail(props.email))
            throw new AlreadyExistError('E-mail')

        if (await this.userRepo.findByNif(props.nif))
            throw new AlreadyExistError('NIF')

        const hashPassword = await bcrypt.hash(props.password, 10)

        const user = new User({
            ...props,
            password: hashPassword
        })

        const wallet = new Wallet({
            balance: 0,
            userId: user.Id
        })

        await this.userRepo.save(user)
        await this.walletRepo.save(wallet)

        return user
    }
}