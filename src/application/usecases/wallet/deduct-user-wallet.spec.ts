import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreditUserWallet } from "./credit-user-wallet"
import { DeductUserWallet } from "./deduct-user-wallet"

describe('Deduct user wallet ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to deduct user wallet', async () => {
        const sut = new DeductUserWallet(walletRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        expect(walletRepo.wallets[0].Balance).toEqual(0)

        await expect(sut.execute(user.Id, 10)).rejects.toThrow()
    })

    it('should be able to deduct multiples times a user wallet', async () => {
        const creditUser = new CreditUserWallet(walletRepo)
        const sut = new DeductUserWallet(walletRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        await creditUser.execute(user.Id, 1000)

        await sut.execute(user.Id, 500)
        await sut.execute(user.Id, 500)

        expect(walletRepo.wallets[0].Balance).toEqual(0)

    })

    it('should not be able to credit a user wallet with fake user id', async () => {

        const sut = new DeductUserWallet(walletRepo)

        await expect(sut.execute('fake-user-id', 2000)).rejects.toThrow()

    })

})