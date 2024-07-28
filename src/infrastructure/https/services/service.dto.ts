import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";


export class CreateServiceDto {

    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    @IsNumber()
    price: number

}