import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { PrismaService } from 'src/common/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CreditsController],
  providers: [CreditsService, PrismaService],
  imports: [AuthModule],
})
export class CreditsModule {}
