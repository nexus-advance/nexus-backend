import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { SeedModule } from './modules/seed/seed.module';

import { AuthModule } from './modules/auth/auth.module'; 
import { ClientsModule } from './modules/clients/clients.module';
import { CreditsModule } from './modules/credits/credits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    SeedModule,
    AuthModule,
    ClientsModule,
    CreditsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
