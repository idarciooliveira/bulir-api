import { Injectable } from "@nestjs/common";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class GetBookingByCustumerId {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(custumerId: string) {
        return await this.bookingRepo.findByCustumerId(custumerId)
    }
}