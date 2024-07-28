import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { AuthenticateUser } from "./authenticate-user"
import { CreateUser } from "./create-user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"

describe('Authenticate user', () => {

    it('should be able to authenticate a user', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const createUser = new CreateUser(userRepo, walletRepo)
        const sut = new AuthenticateUser(userRepo)

        const password = '1234'

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password,
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        const result = await sut.execute(user.Email, password)

        expect(result).toBeTruthy()
        expect(userRepo.users[0]).toBe(result)
    })

    it('should not be able to authenticate user with wrong credential', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const createUser = new CreateUser(userRepo, walletRepo)
        const sut = new AuthenticateUser(userRepo)

        const password = '1234'
        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password,
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        await expect(sut.execute(user.Email, 'wrong-password')).rejects.toThrow()
        await expect(sut.execute('wrong-email', user.Password)).rejects.toThrow()
        await expect(sut.execute('wrong-email', 'wrong-password')).rejects.toThrow()

    })
})