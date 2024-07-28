import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { GetWalletByUserId } from "./get-wallet-by-userId"

describe('Get wallet by user id', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to get a user by his id', async () => {

        const sut = new GetWalletByUserId(walletRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        const wallet = await sut.execute(user.Id)

        expect(wallet).toBeTruthy()
        expect(wallet.UserId).toBe(user.Id)
    })

    it('should be not able to get a wallet with invalid user id', async () => {

        const sut = new GetWalletByUserId(walletRepo)

        await expect(sut.execute('invalid-user-id')).rejects.toThrow()

    })
})