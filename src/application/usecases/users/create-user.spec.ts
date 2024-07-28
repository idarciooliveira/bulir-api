import { CreateUser } from "./create-user"
import { faker } from '@faker-js/faker';
import { compare } from "bcrypt";
import { Role } from "src/application/entities/user";
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository";
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository";

describe('Create user', () => {

    it('should be able to hash a user password', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const sut = new CreateUser(userRepo, walletRepo)

        const password = '12345'

        const user = await sut.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password,
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        const result = await compare(password, user.Password)
        expect(result).toBeTruthy()
        expect(user.Password).not.toBe(password)
    })

    it('should be able to create a new user', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const sut = new CreateUser(userRepo, walletRepo)

        const result = await sut.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        expect(result).toBeTruthy()
        expect(userRepo.users).toHaveLength(1)
    })

    it('should be able to generate a wallet when create a user', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const sut = new CreateUser(userRepo, walletRepo)

        const result = await sut.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        expect(walletRepo.wallets).toHaveLength(1)
        expect(walletRepo.wallets[0]).toBeTruthy()
        expect(walletRepo.wallets[0].UserId).toBe(result.Id)
    })

    it('should not be able to create a user with same e-mail', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const sut = new CreateUser(userRepo, walletRepo)

        const email = faker.internet.email()

        await sut.execute({
            email,
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.CUSTUMER,
            nif: '5001020102'
        })

        await expect(sut.execute({
            email,
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.CUSTUMER,
            nif: '5001020105'
        })).rejects.toThrow()

    })

    it('should not be able to create a user with same nif', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const sut = new CreateUser(userRepo, walletRepo)

        const nif = '5001020102'

        await sut.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.CUSTUMER,
            nif
        })

        await expect(sut.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.CUSTUMER,
            nif
        })).rejects.toThrow()

    })
})