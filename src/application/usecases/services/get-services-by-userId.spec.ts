import { UserRepository } from "src/application/repositories/user-repository"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { Role } from "src/application/entities/user"
import { faker } from '@faker-js/faker'
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreateService } from "./create-service"
import { InMemoryServiceRepository } from "src/application/repositories/in-memory-service-repository"
import { GetServicesByUserId } from "./get-services-by-userId"

describe('Get Services by User Id ', () => {
    let userRepo: UserRepository
    let createUser: CreateUser
    let walletRepo: InMemoryWalletRepository

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        walletRepo = new InMemoryWalletRepository()
        createUser = new CreateUser(userRepo, walletRepo)
    })

    it('should be able to get all services by a userId', async () => {
        const serviceRepo = new InMemoryServiceRepository()
        const createService = new CreateService(serviceRepo, userRepo)
        const sut = new GetServicesByUserId(serviceRepo)

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

        const result = await sut.execute(user.Id)

        expect(result).toHaveLength(2)
        expect(result[0].UserId).toBe(user.Id)
        expect(serviceRepo.services).toHaveLength(3)

    })


})