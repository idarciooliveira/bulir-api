import { CreateUser } from "./create-user"
import { faker } from '@faker-js/faker';
import { GetUsers } from "./get-users";
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository";
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository";
import { Role } from "src/application/entities/user";

describe('Get users', () => {

    it('should be able to get all users', async () => {
        const userRepo = new InMemoryUserRepository()
        const walletRepo = new InMemoryWalletRepository()
        const createUser = new CreateUser(userRepo, walletRepo)
        const sut = new GetUsers(userRepo)

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.SERVICE_PROVIDER,
            nif: '5001020102'
        })

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.SERVICE_PROVIDER,
            nif: '5001520102'
        })

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: Role.SERVICE_PROVIDER,
            nif: '5001020502'
        })

        const result = await sut.execute()

        expect(result).toHaveLength(3)
    })

})