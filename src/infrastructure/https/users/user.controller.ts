import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUser } from "src/application/usecases/users/create-user";
import { GetUserById } from "src/application/usecases/users/get-user-by-id";
import { GetUsers } from "src/application/usecases/users/get-users";
import { CreateUserDto } from "./user.dto";
import { UserViewModel } from "./user-view-model";


@Controller('users')
export class UserController {
    constructor(private createUser: CreateUser,
        private getUserById: GetUserById,
        private getUsers: GetUsers) { }

    @Post()
    async create(@Body() body: CreateUserDto) {
        const user = await this.createUser.execute({
            ...body
        })

        return UserViewModel.toHTTP(user)
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        const user = await this.getUserById.execute(id)
        return UserViewModel.toHTTP(user)
    }

    @Get()
    async findAll() {
        const users = await this.getUsers.execute()
        return users.map(UserViewModel.toHTTP)
    }
}