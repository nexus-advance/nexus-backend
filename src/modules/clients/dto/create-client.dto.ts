import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class CreateClientDto {
  @ApiProperty({})
  @IsString()
  cli_full_name: string;

  @ApiProperty({ example: '2024-01-31' })
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha desde es incorrecta debe ser  YYYY-mm-dd',
  })
  @IsOptional()
  cli_birth_date: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  mar_code: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_dui: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_place_expedition: string;

  @ApiProperty({ example: '2024-01-31' })
  @IsOptional()
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha de expedicion es incorrecta debe ser  YYYY-mm-dd',
  })
  cli_dui_date_expedition: string;

  @ApiProperty({ example: '2024-01-31' })
  @IsString()
  @IsOptional()
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha de expiracion es incorrecta debe ser  YYYY-mm-dd',
  })
  cli_dui_date_expiration: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  gen_code: string;

  @ApiProperty({})
  @IsBoolean()
  @IsOptional()
  cli_is_taxpayer: boolean;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_no_taxpayer: string;

  @ApiProperty({ example: 500 })
  @IsPositive()
  @IsOptional()
  cli_mount_month: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  cli_have_other_incomer: boolean;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_bussiness_tipe: string;

  @ApiProperty({ example: 4 })
  @IsPositive()
  @IsOptional()
  cli_time_bussiness: number;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_address_bussiness: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_dep_code_bussines: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_mun_code_bussines: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_dis_code_bussines: string;

  @ApiProperty({ example: 100 })
  @IsPositive()
  @IsOptional()
  cli_daily_sell: number;

  @ApiProperty({ example: 100 })
  @IsPositive()
  @IsOptional()
  cli_daily_buy: number;

  @ApiProperty({ example: 20 })
  @IsPositive()
  @IsOptional()
  cli_daily_gain: number;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_address: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_phone: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_cell_phone: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_dep_code: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_mun_code: string;

  @ApiProperty({example:'UUID'})
  @IsString()
  @IsOptional()
  cli_dis_code: string;

  @ApiProperty({ example: 10 })
  @IsPositive()
  @IsOptional()
  cli_time_alive: number;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_tenant_name: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  cli_tenant_phone: string;
}
