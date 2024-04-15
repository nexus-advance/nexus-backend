import { Module } from '@nestjs/common';
import { PdfReportsService } from './pdf-reports.service';
import { PdfReportsController } from './pdf-reports.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [PdfReportsController],
  providers: [PdfReportsService, PrismaService],
  imports: [AuthModule],
})
export class PdfReportsModule {}
