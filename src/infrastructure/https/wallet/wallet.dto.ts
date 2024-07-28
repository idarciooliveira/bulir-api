import { IsNumber } from "class-validator";


export class CreditDebtDto {

    @IsNumber()
    amount: number

}