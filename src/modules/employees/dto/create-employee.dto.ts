import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { FORMAT_FECHA_DD_MM_YYYY } from 'src/common/const';

export class CreateEmployeeDto { 
  @ApiProperty({
    description: 'Codigo de usuario (unique)',
    example:'9505002',
    nullable: false,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  emp_code_employee:string;

  @ApiProperty({example:'Eduardo'})
  @IsString()
  @MinLength(2)
  emp_first_name:string;

  @ApiProperty({example:'Emilio'})
  @IsString()
  @MinLength(2)
  emp_second_name:string;

  @ApiProperty({example:'Alfredo'})
  @IsString() 
  @IsOptional() 
  emp_third_name:string;

  @ApiProperty({example:'Beltran'})
  @IsString()
  @MinLength(2)
  emp_first_surname:string;

  @ApiProperty({example:'Aguilera'})
  @IsString()
  @MinLength(2)
  emp_second_surname:string;

  @ApiProperty({example:'de Martines'})
  @IsString() 
  @IsOptional()
  emp_married_surname:string;

  @ApiProperty({example:'a6edc906-2f9f-5fb2-a373-efac406f0ef2'})
  @IsString()
  @MinLength(2)
  emp_codgen:string;

  @ApiProperty({example:'19-08-1998'})
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_DD_MM_YYYY, {
    message: 'La fecha de nacimiento es incorrecta debe ser  dd-mm-YYYY',
  })
  @IsOptional()
  emp_birth_date:string;

  @ApiProperty({example:'19-08-2023'})
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_DD_MM_YYYY, {
    message: 'La fecha de inicio es incorrecta debe ser  dd-mm-YYYY',
  })
  @IsOptional()
  emp_admission_date:string;

  @ApiProperty({example:'26-08-2023'})
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_DD_MM_YYYY, {
    message: 'La fecha de salida es incorrecta debe ser  dd-mm-YYYY',
  })
  @IsOptional()
  emp_departure_date:string;

  @ApiProperty({example:'75 AV. Norte'})
  @IsString()
  @MinLength(2)
  @IsOptional()
  emp_address:string;

  @ApiProperty({example:'6532-5869'})
  @IsString()
  @MinLength(8)
  @IsOptional()
  emp_cel_phone:string;

  @ApiProperty({example:'05175475-8'})
  @IsString()
  @MinLength(8)
  @IsOptional()
  emp_dui:string;

  @ApiProperty({example:'9615-050483-101-6'})
  @IsString()
  @MinLength(8)
  @IsOptional()
  emp_nit:string;

  @ApiProperty({example:'102090250'})
  @IsString()
  @MinLength(8)
  @IsOptional()
  emp_isss:string;

  @ApiProperty({example:'7845235698'})
  @IsString()
  @MinLength(8)
  @IsOptional()
  emp_afp:string;

  @ApiProperty({example:'4.00'})
  @IsNumber()
  @IsPositive()
  @IsOptional()
  emp_hourly_wage:number;

  @ApiProperty({example:'32.00'})
  @IsNumber()
  @IsPositive()
  @IsOptional()
  emp_daily_wage:number;

  @ApiProperty({example:'800.00'})
  @IsNumber()
  @IsPositive()
  @IsOptional()
  emp_base_salary:number;

  @ApiProperty({example:'100.00'})
  @IsNumber()
  @IsPositive()
  @IsOptional()
  emp_viatic:number;

  @ApiProperty({example:'25.00'})
  @IsNumber()
  @IsPositive()
  @IsOptional()
  emp_complementary_diatic:number;

  @ApiProperty({example:'d2ea7375-f8ce-5592-8bf1-a6ccf93563be'})
  @IsString()
  @IsUUID()
  emp_codlad:string;

  @ApiProperty({example:'a39740b1-7e72-5828-ad35-7b2e6fc2aac9'})
  @IsString()
  @IsUUID()
  emp_codjti:string;
  
  @ApiProperty({example:'0855d5d7-bc90-5ebf-bade-580cd4ceec12'})
  @IsString()
  @IsUUID()
  emp_codwst:string;

  @ApiProperty({example:'e8e06aa1-cba7-5af0-be15-703774ccfb3b'})
  @IsString()
  @IsUUID()
  @IsOptional()
  emp_codempboss:string;

}
