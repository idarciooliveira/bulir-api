import { Booking as RawBooking } from '@prisma/client'
import { Booking } from '../../../../application/entities/booking';

export class PrismaBookingMapper {
    static toPrisma(booking: Booking): RawBooking {
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

    static toDomain(raw: RawBooking): Booking {
        return new Booking(
            {
                code: raw.code,
                createdAt: raw.createdAt,
                custumerId: raw.custumerId,
                providerId: raw.providerId,
                serviceId: raw.serviceId,
                startAt: raw.startAt,
                status: raw.status,
                total: raw.total
            },
            raw.id,
        );
    }
}
