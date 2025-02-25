import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../adapters/config/configuration';
import { AuthModule } from './auth.module';
import { CountryModule } from './country.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
