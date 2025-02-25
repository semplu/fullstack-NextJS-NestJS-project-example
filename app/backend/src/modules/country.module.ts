import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../adapters/database/typeorm.module';
import { CountryController } from '../adapters/country/country.controller';
import { CountryRepositoryAdapter } from '../adapters/database/country.repository';
import { CountryServiceAdapter } from '../adapters/country/country.service.adapter';
import { UserRepositoryAdapter } from '../adapters/database/user.repository';

@Module({
  imports: [TypeOrmConfigModule],
  controllers: [CountryController],
  providers: [
    CountryServiceAdapter,
    {
      provide: 'CountryRepositoryPort',
      useClass: CountryRepositoryAdapter,
    },
    {
      provide: 'UserRepositoryPort',
      useClass: UserRepositoryAdapter,
    },
  ],
})
export class CountryModule {}
