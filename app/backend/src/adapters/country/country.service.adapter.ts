import { Injectable, Inject } from '@nestjs/common';
import { CountryService } from '../../core/use-cases/country/country.service';
import { Country } from '../../core/entities/country.entity';
import { CreateCountryDto } from '../../core/use-cases/country/dto/create-country.dto';
import { UpdateCountryDto } from '../../core/use-cases/country/dto/update-country.dto';
import { CountryRepositoryPort } from '../../core/ports/country.repository.port';
import { User } from '../../core/entities/user.entity';
import { UserRepositoryPort } from '../../core/ports/user.repository.port';
import { LoginDto } from '../../core/use-cases/auth/dto/login.dto';

@Injectable()
export class CountryServiceAdapter {
  private readonly countryService: CountryService;

  constructor(
    @Inject('CountryRepositoryPort')
    private readonly countryRepository: CountryRepositoryPort,
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {
    this.countryService = new CountryService(countryRepository, userRepository);
  }

  async getCountries(
    page: number,
    limit: number,
  ): Promise<{ countries: Country[]; total: number }> {
    return this.countryService.getCountries(page, limit);
  }

  async createCountry(
    user: User,
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    return this.countryService.createCountry(user, createCountryDto);
  }

  async updateCountry(
    userId: string,
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countryService.updateCountry(userId, id, updateCountryDto);
  }

  async deleteCountry(userId: string, id: string): Promise<void> {
    return this.countryService.deleteCountry(userId, id);
  }
}
