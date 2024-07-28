import { Booking } from "../entities/booking";
import { BookingRepository } from "./booking-repository";

export class InMemoryBookingRepository implements BookingRepository {

    public Bookings: Booking[] = []

    async getAll(): Promise<Booking[]> {
        return this.Bookings
    }

    async update(booking: Booking): Promise<void> {
        const index = this.Bookings.findIndex(booking => booking.Id == booking.Id)
        if (index >= 0) this.Bookings[index] = booking
    }

    async findById(id: string): Promise<Booking> {
        return this.Bookings.find(u => u.Id === id)
    }

    async findByCustumerId(custumerId: string): Promise<Booking[]> {
        return this.Bookings.filter(u => u.CustumerId === custumerId)
    }

    async findByProviderId(providerId: string): Promise<Booking[]> {
        return this.Bookings.filter(u => u.ProviderId === providerId)
    }

    async save(booking: Booking): Promise<void> {
        this.Bookings.push(booking)
    }
}