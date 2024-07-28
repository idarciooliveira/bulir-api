import { Injectable } from "@nestjs/common";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class GetAllBooking {
    constructor(private bookingRepo: BookingRepository) { }

    async execute() {
        return await this.bookingRepo.getAll()
    }
}