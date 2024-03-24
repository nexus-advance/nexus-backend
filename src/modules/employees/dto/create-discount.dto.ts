import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsString, IsUUID, Matches, MinLength } from "class-validator";
import { FORMAT_FECHA_DD_MM_YYYY } from "src/common/const";


export class CreateDisountDTO {

    @ApiProperty({
        description: 'Codigo de institucion (unique)',
        example: 'd49d1789-60cf-42d7-af5c-d45a15043106',
        nullable: false,
    })
    @IsString()
    @IsUUID()
    des_coddin: string;

    @ApiProperty({
        description: 'Codigo de institucion (unique)',
        example: 'd49d1789-60cf-42d7-af5c-d45a15043106',
        nullable: false,
    })
    @IsString()
    des_reference: string;

    @ApiProperty({ example: '19-08-1998' })
    @IsString()
    @MinLength(4)
    @Matches(FORMAT_FECHA_DD_MM_YYYY, {
        message: 'La fecha de nacimiento es incorrecta debe ser  dd-mm-YYYY',
    })
    emp_start_date: string;

    @ApiProperty({ example: '19-08-1998' })
    @IsString()
    @MinLength(4)
    @Matches(FORMAT_FECHA_DD_MM_YYYY, {
        message: 'La fecha de nacimiento es incorrecta debe ser  dd-mm-YYYY',
    })
    emp_end_date: string;

    @ApiProperty({ example: 12 })
    @IsPositive()
    des_number_dues: number;

    @ApiProperty({ example: 127.56 })
    @IsPositive()
    des_amount: number;

    @ApiProperty({
        description: 'Codigo de institucion (unique)',
        example: 'd49d1789-60cf-42d7-af5c-d45a15043106',
        nullable: false,
    })
    @IsString()
    @IsUUID()
    des_codemp: string;
}