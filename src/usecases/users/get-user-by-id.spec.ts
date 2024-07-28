import { InMemoryUserRepository } from "src/repositories/in-memory-user-repository"
import { CreateUser } from "./create-user"
import { faker } from '@faker-js/faker';
import { GetUserById } from "./get-user-by-id";

describe('Get user by id', () => {

    it('should be able to get user by id', async () => {
        const userRepo = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepo)
        const sut = new GetUserById(userRepo)

        const user = await createUser.execute({
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
            nif: '5001020502'
        })

        const result = await sut.execute(user.Id)

        expect(result).toBeTruthy()
        expect(result).toBe(user)
    })

    it('should not be able to get user by wrong id', async () => {
        const userRepo = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepo)
        const sut = new GetUserById(userRepo)

        await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            password: faker.internet.password(),
            role: 'SERVICE_PROVIDER',
            nif: '5001020502'
        })

        await expect(sut.execute('wrong-id')).rejects.toThrow()
    })

})