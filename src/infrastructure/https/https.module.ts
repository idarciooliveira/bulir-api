import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthenticateUser } from "src/application/usecases/users/authenticate-user";
import { CreateUser } from "src/application/usecases/users/create-user";
import { GetUserById } from "src/application/usecases/users/get-user-by-id";
import { GetUsers } from "src/application/usecases/users/get-users";
import { UserController } from "./users/user.controller";
import { AuthModule } from "../auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { WalletController } from "./wallet/wallet.controller";
import { CreditUserWallet } from "src/application/usecases/wallet/credit-user-wallet";
import { GetWalletByUserId } from "src/application/usecases/wallet/get-wallet-by-userId";
import { ServiceController } from "./services/service.controller";
import { GetAllService } from "src/application/usecases/services/get-all-services";
import { GetServicesByUserId } from "src/application/usecases/services/get-services-by-userId";
import { GetServiceById } from "src/application/usecases/services/get-service-by-id";
import { CreateService } from "src/application/usecases/services/create-service";
import { CancelBooking } from "src/application/usecases/bookings/cancel-booking";
import { CompleteBooking } from "src/application/usecases/bookings/complete-booking";
import { ConfirmBooking } from "src/application/usecases/bookings/confirm-booking";
import { MakeReservation } from "src/application/usecases/bookings/make-reservation";
import { BookingController } from "./bookings/booking.controller";
import { GetAllBooking } from "src/application/usecases/bookings/get-all-booking";
import { GetBookingByCustumerId } from "src/application/usecases/bookings/get-booking-by-custumerId";
import { GetBookingById } from "src/application/usecases/bookings/get-booking-by-id";
import { GetBookingByProviderId } from "src/application/usecases/bookings/get-booking-by-providerId";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [
        UserController,
        AuthController,
        WalletController,
        ServiceController,
        BookingController
    ],
    providers: [
        AuthenticateUser,
        CreateUser,
        GetUserById,
        GetUsers,
        CreditUserWallet,
        GetWalletByUserId,
        CreateService,
        GetAllService,
        GetServicesByUserId,
        GetServiceById,
        CancelBooking,
        CompleteBooking,
        ConfirmBooking,
        MakeReservation,
        GetAllBooking,
        GetBookingByCustumerId,
        GetBookingById,
        GetBookingByProviderId
    ]
})

export class HttpModule { }