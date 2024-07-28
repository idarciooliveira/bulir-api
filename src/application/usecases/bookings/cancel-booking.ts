import { Injectable } from "@nestjs/common";
import { BookingStatus } from "src/application/entities/booking";
import { BadRequestError, NotAuthorizatedError, NotFoundError } from "src/application/errors/error";
import { BookingRepository } from "src/application/repositories/booking-repository";
import { WalletRepository } from "src/application/repositories/wallet-repository";


@Injectable()
export class CancelBooking {
    constructor(private bookingRepo: BookingRepository,
        private walletRepo: WalletRepository) { }

    async execute(bookingId: string, userId: string) {
        const booking = await this.bookingRepo.findById(bookingId)

        if (!booking) throw new NotFoundError('Booking')

        if (booking.ProviderId !== userId && booking.CustumerId !== userId)
            throw new NotAuthorizatedError()

        if (booking.Status === BookingStatus.CANCELLED)
            throw new BadRequestError('Booking already cancelled')

        if (booking.Status === BookingStatus.COMPLETED)
            throw new BadRequestError('Booking cannot be cancelled')

        const providerWallet = await this.walletRepo.findByUserId(booking.ProviderId)
        const custumerWallet = await this.walletRepo.findByUserId(booking.CustumerId)

        providerWallet.Balance -= booking.Total
        custumerWallet.Balance += booking.Total

        booking.Status = BookingStatus.CANCELLED

        await this.bookingRepo.update(booking)
        await this.walletRepo.update(providerWallet)
        await this.walletRepo.update(custumerWallet)
    }
}