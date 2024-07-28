import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreditUserWallet } from "./credit-user-wallet"

describe('Credit user wallet ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to credit user wallet', async () => {

        const sut = new CreditUserWallet(walletRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        expect(walletRepo.wallets[0].Balance).toEqual(0)

        await sut.execute(user.Id, 1000)

        expect(walletRepo.wallets[0].Balance).toEqual(1000)

    })

    it('should be able to credit multiples times a user wallet', async () => {

        const sut = new CreditUserWallet(walletRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        await sut.execute(user.Id, 1000)
        await sut.execute(user.Id, 2000)

        expect(walletRepo.wallets[0].Balance).toEqual(3000)

    })

    it('should not be able to credit a user wallet with fake user id', async () => {

        const sut = new CreditUserWallet(walletRepo)

        await expect(sut.execute('fake-user-id', 2000)).rejects.toThrow()

    })

})