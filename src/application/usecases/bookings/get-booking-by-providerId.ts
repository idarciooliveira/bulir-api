import { Injectable } from "@nestjs/common";
import { BookingRepository } from "src/application/repositories/booking-repository";


@Injectable()
export class GetBookingByProviderId {
    constructor(private bookingRepo: BookingRepository) { }

    async execute(providerId: string) {
        return await this.bookingRepo.findByProviderId(providerId)
    }
}