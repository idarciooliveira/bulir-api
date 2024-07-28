import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/user-repository";
import * as bcrypt from 'bcrypt'
import { User } from "src/entities/user";
import { AlreadyExistError } from "src/application/errors/error";

type CreateUserProps = {
    fullname: string
    nif: string
    email: string
    password: string
    role: string
}

@Injectable()
export class CreateUser {

    constructor(private userRepo: UserRepository) { }

    async execute(props: CreateUserProps) {

        if (await this.userRepo.findByEmail(props.email))
            throw new AlreadyExistError('E-mail')

        if (await this.userRepo.findByNif(props.nif))
            throw new AlreadyExistError('NIF')

        const hashPassword = await bcrypt.hash(props.password, 10)

        const user = new User({
            ...props,
            password: hashPassword
        })

        await this.userRepo.save(user)

        return user
    }
}