import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { HEADER_API_BEARER_AUTH } from 'src/common/const';
import { nex_usr_usuario } from '@prisma/client';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { FilterAbonsoDto } from './dto/create-abono.dto copy';

@ApiTags('Creditos')
@Controller('v1/credits')
@Auth()
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) { }

  @Post()
  create(
    @Body() createCreditDto: CreateCreditDto,
    @GetUser() user: nex_usr_usuario
  ) {
    return this.creditsService.create(createCreditDto,user);
  }
  @Post("generar-abono")
  generarAbono(
    @Body() createAbonoDto: CreateAbonoDto,
    @GetUser() user: nex_usr_usuario
  ) {
    return this.creditsService.generarAbono(createAbonoDto,user);
  }


  @Get("taxse")
  findTaxt() {
    return this.creditsService.findTaxt();
  }


  @Post("dues")
  findDues(
    @Body() filterAbonsoDto: FilterAbonsoDto,
  ) {
    return this.creditsService.findDues(filterAbonsoDto);
  }

  @Get()
  findAll() {
    return this.creditsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditDto: UpdateCreditDto) {
    return this.creditsService.update(+id, updateCreditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditsService.remove(+id);
  }
}
