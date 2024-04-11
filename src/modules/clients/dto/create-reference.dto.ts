import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class CreateReferenceDto {
  @ApiProperty({})
  @IsString()
  ref_name: string;

  @ApiProperty({ example: 'UUID' })
  @IsString()
  @IsUUID('all', { message: 'Zona incorrecto' })
  @IsOptional()
  rel_code: string;

  @ApiProperty({})
  @IsString()
  ref_address: string;

  @ApiProperty({})
  @IsString()
  ref_work_place: string;

  @ApiProperty({})
  @IsString()
  ref_phone: string;

  @ApiProperty({ example: 'UUID' })
  @IsString()
  @IsUUID('all', { message: 'Zona incorrecto' })
  @IsOptional()
  cli_code: string;
}