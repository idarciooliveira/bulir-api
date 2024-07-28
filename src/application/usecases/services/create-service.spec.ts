import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreateService } from "./create-service"
import { InMemoryServiceRepository } from "src/application/repositories/in-memory-service-repository"

describe('Create Service ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to create service', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const sut = new CreateService(serviceRepo, userRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        const service = await sut.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: user.Id
        })

        expect(service).toBeTruthy()
        expect(service).toHaveProperty('_id')
        expect(service.UserId).toBe(user.Id)

    })



    it('should not be able to create a service with fake user id', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const sut = new CreateService(serviceRepo, userRepo)

        await expect(sut.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: 'invalid user id'
        })).rejects.toThrow()

    })

})