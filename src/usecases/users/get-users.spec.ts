import { InMemoryUserRepository } from "src/repositories/in-memory-user-repository"
import { CreateUser } from "./create-user"
import { faker } from '@faker-js/faker';
import { GetUsers } from "./get-users";

describe('Get users', () => {

    it('should be able to get all users', async () => {
        const userRepo = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepo)
        const sut = new GetUsers(userRepo)

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001020102'
        })

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001520102'
        })

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001020502'
        })

        const result = await sut.execute()

        expect(result).toHaveLength(3)
    })

})