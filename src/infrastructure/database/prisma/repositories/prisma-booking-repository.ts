import { Injectable } from "@nestjs/common";

import { BookingRepository } from "src/application/repositories/booking-repository";
import { Booking } from "src/application/entities/booking";
import { PrismaBookingMapper } from "../mappers/prisma-booking-mapper";
import { PrismaService } from "../prisma.service";


@Injectable()
export class PrismaBookingRepository implements BookingRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async update(booking: Booking): Promise<void> {
        const raw = PrismaBookingMapper.toPrisma(booking)
        await this.prismaService.booking.update({
            data: raw,
            where: {
                id: booking.Id
            }
        })
    }

    async findByCustumerId(custumerId: string): Promise<Booking[]> {
        const bookings = await this.prismaService.booking.findMany({
            where: {
                custumerId
            }
        })
        return bookings.map(PrismaBookingMapper.toDomain)
    }
    async findByProviderId(providerId: string): Promise<Booking[]> {
        const bookings = await this.prismaService.booking.findMany({
            where: {
                providerId
            }
        })
        return bookings.map(PrismaBookingMapper.toDomain)
    }

    async save(booking: Booking): Promise<void> {
        const raw = PrismaBookingMapper.toPrisma(booking)
        await this.prismaService.booking.create({
            data: raw
        })
    }

    async findById(id: string): Promise<Booking> {
        const booking = await this.prismaService.booking.findUnique({
            where: {
                id
            }
        })

        return PrismaBookingMapper.toDomain(booking)
    }
    async getAll(): Promise<Booking[]> {
        const bookings = await this.prismaService.booking.findMany()
        return bookings.map(PrismaBookingMapper.toDomain)
    }
}