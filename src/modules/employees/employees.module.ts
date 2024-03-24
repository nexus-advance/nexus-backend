import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService,PrismaService],
  imports: [AuthModule],
})
export class EmployeesModule {}
