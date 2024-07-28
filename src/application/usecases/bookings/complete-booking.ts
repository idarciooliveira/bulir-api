import { Injectable } from "@nestjs/common";
import { BookingStatus } from "src/application/entities/booking";
import { BadRequestError, NotAuthorizatedError, NotFoundError } from "src/application/errors/error";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class CompleteBooking {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(bookingId: string, userId: string) {
        const booking = await this.bookingRepo.findById(bookingId)
        if (!booking) throw new NotFoundError('Booking')

        if (booking.ProviderId !== userId)
            throw new NotAuthorizatedError()

        if (booking.Status === BookingStatus.CANCELLED)
            throw new BadRequestError('Booking already cancelled')

        if (booking.Status === BookingStatus.COMPLETED)
            throw new BadRequestError('Booking already completed')

        if (booking.Status === BookingStatus.PENDING)
            throw new BadRequestError('Booking must be confirmed first')

        booking.Status = BookingStatus.COMPLETED

        await this.bookingRepo.update(booking)
    }
}