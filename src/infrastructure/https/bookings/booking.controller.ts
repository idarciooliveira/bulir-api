import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CancelBooking } from "src/application/usecases/bookings/cancel-booking";
import { CompleteBooking } from "src/application/usecases/bookings/complete-booking";
import { ConfirmBooking } from "src/application/usecases/bookings/confirm-booking";
import { MakeReservation } from "src/application/usecases/bookings/make-reservation";
import { JwtAuthGuard } from "src/infrastructure/auth/passport/jwt-auth.guard";
import { MakeReservationDto } from "./booking.dto";
import { GetCurrentUserId } from "src/infrastructure/auth/rbac/user.decorator";
import { BookingViewModel } from "./booking-view-model";
import { RoleGuard } from "src/infrastructure/auth/rbac/role.guard";
import { Roles } from "src/infrastructure/auth/rbac/role.decorator";
import { Role } from "src/application/entities/user";
import { GetAllBooking } from "src/application/usecases/bookings/get-all-booking";
import { GetBookingByCustumerId } from "src/application/usecases/bookings/get-booking-by-custumerId";
import { GetBookingById } from "src/application/usecases/bookings/get-booking-by-id";
import { GetBookingByProviderId } from "src/application/usecases/bookings/get-booking-by-providerId";

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {

    constructor(private cancelBooking: CancelBooking,
        private getAllBooking: GetAllBooking,
        private completeBooking: CompleteBooking,
        private confirmBooking: ConfirmBooking,
        private getBookingByCustumerId: GetBookingByCustumerId,
        private getBookingById: GetBookingById,
        private getBookingByProviderId: GetBookingByProviderId,
        private makeReservation: MakeReservation) { }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        const booking = await this.getBookingById.execute(id)
        return BookingViewModel.toHTTP(booking)
    }

    @Get('/:id/providers')
    async getByProviderId(@Param('id') id: string) {
        const bookings = await this.getBookingByProviderId.execute(id)
        return bookings.map(BookingViewModel.toHTTP)
    }

    @Get('/:id/custumers')
    async getByCustumerId(@Param('id') id: string) {
        const bookings = await this.getBookingByCustumerId.execute(id)
        return bookings.map(BookingViewModel.toHTTP)
    }

    @Get()
    async getAll() {
        const bookings = await this.getAllBooking.execute()
        return bookings.map(BookingViewModel.toHTTP)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.CUSTUMER)
    @Post()
    async create(@Body() body: MakeReservationDto,
        @GetCurrentUserId() userId: string) {
        const booking = await this.makeReservation.execute({
            ...body,
            custumerId: userId,
        })

        return BookingViewModel.toHTTP(booking)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.SERVICE_PROVIDER)
    @Patch('/:id/confirm')
    async confirm(@Param('id') id: string,
        @GetCurrentUserId() userId: string) {
        await this.confirmBooking.execute(id, userId)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.SERVICE_PROVIDER, Role.CUSTUMER)
    @Patch('/:id/cancel')
    async cancel(@Param('id') id: string,
        @GetCurrentUserId() userId: string) {
        await this.cancelBooking.execute(id, userId)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.SERVICE_PROVIDER)
    @Patch('/:id/complete')
    async complete(@Param('id') id: string,
        @GetCurrentUserId() userId: string) {
        await this.completeBooking.execute(id, userId)
    }




}