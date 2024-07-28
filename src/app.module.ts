import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { HttpModule } from './infrastructure/https/https.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 3,
    }]),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    HttpModule,
    AuthModule
  ],
})
export class AppModule { }
