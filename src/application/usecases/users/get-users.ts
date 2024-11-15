import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/application/repositories/user-repository";


@Injectable()
export class GetUsers {
    constructor(private userRepo: UserRepository) { }

    async execute() {
        return await this.userRepo.getAll()
    }
}