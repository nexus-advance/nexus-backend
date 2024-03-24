import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PlanillasService } from './planillas.service';
import { CreatePlanillaDto } from './dto/create-planilla.dto';
import { UpdatePlanillaDto } from './dto/update-planilla.dto';
import { HEADER_API_BEARER_AUTH } from 'src/common/const';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { hos_usr_usuario } from '@prisma/client';

@ApiTags('Spreadsheets')
@Controller('v1/spreadsheets')
@Auth()
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class PlanillasController {
  constructor(private readonly planillasService: PlanillasService) { }

  @Post()
  create(@Body() createPlanillaDto: CreatePlanillaDto, @GetUser() user: hos_usr_usuario,) {
    return this.planillasService.create(createPlanillaDto, user);
  }

  @Get()
  findAll() {
    return this.planillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.planillasService.findOne(id);
  }


  @Get('get/payment-type')
  paymentType() {
    return this.planillasService.paymentType();
  }

  @Get('get/catalogs')
  getCatalogs() {
    return this.planillasService.getCatalogs();
  }

  @Get('get/payment-month')
  paymentMonth() {
    return this.planillasService.paymentMonth();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanillaDto: UpdatePlanillaDto) {
    return this.planillasService.update(+id, updatePlanillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planillasService.remove(+id);
  }
} 