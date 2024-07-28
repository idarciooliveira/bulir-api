import { Injectable } from "@nestjs/common";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class GetBookingById {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(id: string) {
        return await this.bookingRepo.findById(id)
    }
}