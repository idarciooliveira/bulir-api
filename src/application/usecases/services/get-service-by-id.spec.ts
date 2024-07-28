import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreateService } from "./create-service"
import { InMemoryServiceRepository } from "src/application/repositories/in-memory-service-repository"
import { GetServiceById } from "./get-service-by-id"

describe('Get Service by Id ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to get  service by a id', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const createService = new CreateService(serviceRepo, userRepo)
        const sut = new GetServiceById(serviceRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })


        await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: user.Id
        })

        const service = await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: user.Id
        })

        const result = await sut.execute(service.Id)

        expect(result).toBeTruthy()
        expect(result.Id).toBe(service.Id)
    })

    it('should not be able to get  service with wrong id', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const sut = new GetServiceById(serviceRepo)
        await expect(sut.execute('fake service id')).rejects.toThrow()
    })

})