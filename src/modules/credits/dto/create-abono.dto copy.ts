import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, } from "class-validator";
import { FORMAT_FECHA_YYYY_MM_DD } from "src/common/const";

export class FilterAbonsoDto {

    @ApiProperty({ example: '2024-01-31' })
    @IsString()
    @Matches(FORMAT_FECHA_YYYY_MM_DD, {
        message: 'La fecha de inicio es incorrecta debe ser  YYYY-mm-dd',
    })
    date: string;

}
