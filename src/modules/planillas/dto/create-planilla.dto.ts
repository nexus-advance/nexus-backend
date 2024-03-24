import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreatePlanillaDto {


    @ApiProperty()
    @IsString()
    @MinLength(1)
    pla_name: string;
 
    @ApiProperty()
    @IsString()
    @MinLength(1)
    pla_period: string; 

    @ApiProperty()
    @IsString()
    @MinLength(1)
    pla_payment_type: string; //quincenal, mensual
}
