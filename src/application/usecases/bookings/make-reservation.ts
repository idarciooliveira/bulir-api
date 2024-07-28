import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { Booking, BookingStatus } from "src/application/entities/booking";
import { BadRequestError, InsufficientFundsError } from "src/application/errors/error";
import { BookingRepository } from "src/application/repositories/booking-repository";
import { ServiceRepository } from "src/application/repositories/service-repository";
import { UserRepository } from "src/application/repositories/user-repository";
import { WalletRepository } from "src/application/repositories/wallet-repository";

type MakeReservationProps = {
    custumerId: string
    serviceId: string
    startAt: Date
}

@Injectable()
export class MakeReservation {
    constructor(private bookingRepo: BookingRepository,
        private serviceRepo: ServiceRepository,
        private walletRepo: WalletRepository,
        private userRepo: UserRepository) { }

    async execute(props: MakeReservationProps) {
        const service = await this.serviceRepo.findById(props.serviceId)
        if (!service) throw new BadRequestError('Invalid service')

        const custumer = await this.userRepo.findById(props.custumerId)
        if (!custumer) throw new BadRequestError('Invalid custumer')

        const custumerWallet = await this.walletRepo.findByUserId(custumer.Id)
        const providerWallet = await this.walletRepo.findByUserId(service.UserId)

        if (service.Price > custumerWallet.Balance) throw new InsufficientFundsError()

        const booking = new Booking({
            ...props,
            code: randomBytes(6).toString('hex').toUpperCase(),
            createdAt: new Date(),
            status: BookingStatus.PENDING,
            total: service.Price,
            providerId: service.UserId
        })

        custumerWallet.Balance -= service.Price
        providerWallet.Balance += service.Price

        await this.bookingRepo.save(booking)
        await this.walletRepo.update(custumerWallet)
        await this.walletRepo.update(providerWallet)

        return booking

    }
}