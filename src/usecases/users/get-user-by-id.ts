import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/application/errors/error";
import { UserRepository } from "src/repositories/user-repository";


@Injectable()
export class GetUserById {
    constructor(private userRepo: UserRepository) { }

    async execute(id: string) {
        const user = await this.userRepo.findById(id)
        if (!user) throw new NotFoundError('User')
        return user
    }
}