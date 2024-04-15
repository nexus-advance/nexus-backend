import { Controller, Get, Param } from '@nestjs/common';
import { PdfReportsService } from './pdf-reports.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators';
import { HEADER_API_BEARER_AUTH } from 'src/common/const';
 
@ApiTags('Reports')
@Controller('v1/pdf-reports')
@Auth()
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class PdfReportsController {
  constructor(private readonly pdfReportsService: PdfReportsService) {

  } 

  @Get('generar-pagare/:id')
  generarPagare(@Param('id') id: string) { 
    return this.pdfReportsService.prepararPagare(id);
  }
}
