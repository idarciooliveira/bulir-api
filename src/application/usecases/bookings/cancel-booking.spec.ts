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
import { ConfirmBooking } from "./confirm-booking"
import { CompleteBooking } from "./complete-booking"
import { CancelBooking } from "./cancel-booking"

describe('Cancel booking', () => {
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

    it('should be able to cancel a reservation', async () => {
        const bookingRepo = new InMemoryBookingRepository()
        const makeReservation = new MakeReservation(bookingRepo, serviceRepo, walletRepo, userRepo)
        const sut = new CancelBooking(bookingRepo)

        const booking = await makeReservation.execute({
            custumerId: custumer.Id,
            serviceId: service.Id,
            startAt: new Date()
        })

        await sut.execute(booking.Id)

        expect(bookingRepo.Bookings[0].Status)
            .toBe(BookingStatus.CANCELLED)
    })

    it('should not be able to cancel a reservation that is already completed', async () => {
        const bookingRepo = new InMemoryBookingRepository()
        const makeReservation = new MakeReservation(bookingRepo, serviceRepo, walletRepo, userRepo)
        const confirmBooking = new ConfirmBooking(bookingRepo)
        const completeBooking = new CompleteBooking(bookingRepo)
        const sut = new CancelBooking(bookingRepo)


        const booking = await makeReservation.execute({
            custumerId: custumer.Id,
            serviceId: service.Id,
            startAt: new Date()
        })

        await confirmBooking.execute(booking.Id)
        await completeBooking.execute(booking.Id)

        await expect(sut.execute(booking.Id)).rejects.toThrow()
    })

    it('should not be able to cancel a reservation that is cancelled', async () => {
        const bookingRepo = new InMemoryBookingRepository()
        const makeReservation = new MakeReservation(bookingRepo, serviceRepo, walletRepo, userRepo)

        const sut = new CancelBooking(bookingRepo)

        const booking = await makeReservation.execute({
            custumerId: custumer.Id,
            serviceId: service.Id,
            startAt: new Date()
        })

        await sut.execute(booking.Id)

        await expect(sut.execute(booking.Id)).rejects.toThrow()
    })


})