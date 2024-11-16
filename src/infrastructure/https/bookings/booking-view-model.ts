import { Booking } from "../../../application/entities/booking";

export class BookingViewModel {
    static toHTTP(booking: Booking) {
        return {
            id: booking.Id,
            code: booking.Code,
            createdAt: booking.CreatedAt,
            startAt: booking.StartAt,
            status: booking.Status,
            total: booking.Total,
            provider: booking.Provider,
            custumer: booking.Custumer,
            service: booking.Service
        };
    }
}
