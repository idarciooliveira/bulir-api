import { Booking } from "../../../application/entities/booking";

export class BookingViewModel {
    static toHTTP(booking: Booking) {
        return {
            id: booking.Id,
            code: booking.Code,
            createdAt: booking.CreatedAt,
            custumerId: booking.CustumerId,
            providerId: booking.ProviderId,
            serviceId: booking.ServiceId,
            startAt: booking.StartAt,
            status: booking.Status,
            total: booking.Total
        };
    }
}
