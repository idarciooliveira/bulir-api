import { Role, User } from "src/application/entities/user"
import { CreateUser } from "../users/create-user"
import { InMemoryUserRepository } from "src/application/repositories/in-memory-user-repository"
import { InMemoryServiceRepository } from "src/application/repositories/in-memory-service-repository"
import { CreateService } from "../services/create-service"
import { InMemoryWalletRepository } from "src/application/repositories/in-memory-wallet-repository"
import { CreditUserWallet } from "../wallet/credit-user-wallet"
import { InMemoryBookingRepository } from "src/application/repositories/in-memory-booking-repository"
import { faker } from '@faker-js/faker'
import { MakeReservation } from "./make-reservation"
import { Service } from "src/application/entities/service"
import { BookingStatus } from "src/application/entities/booking"

describe('Make reservation', () => {
    let custumer: User
    let provider: User
    let service: Service
    let createUser: CreateUser
    let createService: CreateService
    let userRepo: InMemoryUserRepository
    let serviceRepo: InMemoryServiceRepository
    let walletRepo: InMemoryWalletRepository
    let creditUserWallet: CreditUserWallet

    beforeEach(async () => {
        userRepo = new InMemoryUserRepository()
        serviceRepo = new InMemoryServiceRepository()
        walletRepo = new InMemoryWalletRepository()

        createUser = new CreateUser(userRepo, walletRepo)
        createService = new CreateService(serviceRepo, userRepo)
        creditUserWallet = new CreditUserWallet(walletRepo)

        custumer = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5201209120',
            password: faker.internet.password(),
            role: Role.CUSTUMER
        })

        await creditUserWallet.execute(custumer.Id, 5000)

        provider = await createUser.execute({
            email: faker.internet.email(),
            fullname: faker.person.fullName(),
            nif: '5201269120',
            password: faker.internet.password(),
            role: Role.SERVICE_PROVIDER
        })

        service = await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: 2500,
            userId: provider.Id
        })
    })

    it('should be able to make a reservation', async () => {
        const bookingRepo = new InMemoryBookingRepository()
        const sut = new MakeReservation(bookingRepo, serviceRepo, walletRepo, userRepo)

        const result = await sut.execute({
            custumerId: custumer.Id,
            serviceId: service.Id,
            startAt: new Date()
        })

        expect(result).toBeTruthy()
        expect(result.Code).toBeTruthy()
        expect(result.Status).toBe(BookingStatus.PENDING)
        expect(result.Total).toBe(service.Price)

        expect(walletRepo.wallets[0].Balance).toEqual(2500)
        expect(walletRepo.wallets[1].Balance).toEqual(2500)
    })

    it('should not be able to make a reservation with insufficiente fund', async () => {
        const bookingRepo = new InMemoryBookingRepository()
        const sut = new MakeReservation(bookingRepo, serviceRepo, walletRepo, userRepo)

        const expensiveService = await createService.execute({
            name: faker.person.jobArea(),
            description: faker.person.jobDescriptor(),
            price: 10000,
            userId: provider.Id
        })

        await expect(sut.execute({
            custumerId: custumer.Id,
            serviceId: expensiveService.Id,
            startAt: new Date()
        })).rejects.toThrow()
    })
})