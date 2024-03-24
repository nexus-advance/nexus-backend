import { Module } from '@nestjs/common';
import { PlanillasService } from './planillas.service';
import { PlanillasController } from './planillas.controller';
import { PrismaService } from 'src/common/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PlanillasController],
  providers: [PlanillasService, PrismaService],
  imports: [AuthModule],
})
export class PlanillasModule { }
