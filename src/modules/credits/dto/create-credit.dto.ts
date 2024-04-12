import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, IsUUID, Matches } from "class-validator";
import { FORMAT_FECHA_YYYY_MM_DD } from "src/common/const";

export class CreateCreditDto {


    @ApiProperty({})
    @IsInt()
    cre_days: number;

    @ApiProperty({})
    @IsPositive()
    cre_daily_quota: number;

    @ApiProperty({})
    @IsPositive()
    cre_neto_amount: number;

    @ApiProperty({})
    @IsPositive()
    cre_tax_amount: number;
    
    @ApiProperty({})
    @IsPositive()
    cre_brut_amount: number;

    @ApiProperty({ example: 'UUID' })
    @IsString()
    @IsUUID('all', { message: 'Cliente incorrecto' })
    cli_code: string;

    @ApiProperty({ example: 'UUID' })
    @IsString()
    @IsUUID('all', { message: 'Taza incorrecta' })
    per_code: string; 

    @ApiProperty({ example: '2024-01-31' })
    @IsString()
    @Matches(FORMAT_FECHA_YYYY_MM_DD, {
        message: 'La fecha de inicio es incorrecta debe ser  YYYY-mm-dd',
    })
    cre_date_start: string;

}
