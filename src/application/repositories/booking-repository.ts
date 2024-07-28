import { Booking } from "../entities/booking";

export abstract class BookingRepository {
    abstract save(booking: Booking): Promise<void>
    abstract update(booking: Booking): Promise<void>
    abstract findById(id: string): Promise<Booking | null>
    abstract getAll(): Promise<Booking[]>
    abstract findByCustumerId(custumerId: string): Promise<Booking[]>
    abstract findByProviderId(providerId: string): Promise<Booking[]>
}