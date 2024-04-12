import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsString, IsUUID, } from "class-validator";

export class CreateAbonoDto {



    @ApiProperty({})
    @IsPositive()
    amount: number;

    @ApiProperty({ example: 'UUID' })
    @IsString()
    @IsUUID('all', { message: 'Cliente incorrecto' })
    cre_code: string;


}
