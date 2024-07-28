import { Injectable } from "@nestjs/common";
import { BookingStatus } from "src/application/entities/booking";
import { BadRequestError, NotFoundError } from "src/application/errors/error";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class CancelBooking {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(bookingId: string) {
        const booking = await this.bookingRepo.findById(bookingId)
        if (!booking) throw new NotFoundError('Booking')

        if (booking.Status === BookingStatus.CANCELLED)
            throw new BadRequestError('Booking already cancelled')

        if (booking.Status === BookingStatus.COMPLETED)
            throw new BadRequestError('Booking cannot be cancelled')

        booking.Status = BookingStatus.CANCELLED

        await this.bookingRepo.update(booking)
    }
}