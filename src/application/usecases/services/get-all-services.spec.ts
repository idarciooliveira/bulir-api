import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreateService } from "./create-service"
import { InMemoryServiceRepository } from "src/application/repositories/in-memory-service-repository"
import { GetAllService } from "./get-all-services"

describe('Get all Services ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to get all services', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const createService = new CreateService(serviceRepo, userRepo)
        const sut = new GetAllService(serviceRepo)

        const user = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        const secondUser = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5001209129',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: user.Id
        })

        await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: user.Id
        })

        await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: faker.number.int(),
            userId: secondUser.Id
        })

        const result = await sut.execute()

        expect(result).toHaveLength(3)
        expect(serviceRepo.services).toHaveLength(3)

    })


})