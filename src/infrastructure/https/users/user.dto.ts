import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    fullname: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    nif: string

    @IsNotEmpty()
    role: string

    @IsNotEmpty()
    password: string

}