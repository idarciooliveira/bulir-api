import { IsDateString, IsUUID } from "class-validator";


export class MakeReservationDto {
    @IsUUID()
    serviceId: string
    @IsDateString()
    startAt: Date
}