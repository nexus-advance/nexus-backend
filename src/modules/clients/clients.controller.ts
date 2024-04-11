import {
  Controller,
  Get,
  Post,
  Body, 
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators';
import { HEADER_API_BEARER_AUTH } from 'src/common/const';
import { CreateReferenceDto } from './dto/create-reference.dto';

@ApiTags('Clients')
@Controller('v1/clients')
@Auth()
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }


  @Post("reference")
  createRefence(@Body() createReferenceDto: CreateReferenceDto) {
    return this.clientsService.createRefence(createReferenceDto);
  }


  @Get('reference/:id')
  findReferences(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.findReferences(id);
  }


  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('get/catalogs')
  findAllCatalog() {
    return this.clientsService.findAllCatalog();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.remove(id);
  }

  @Delete('reference/:id')
  removeReference(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.removeReference(id);
  }
}
