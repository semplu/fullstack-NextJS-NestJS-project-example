import { CountryRepositoryPort } from '../../ports/country.repository.port';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { User } from '../../entities/user.entity';
import { Country } from '../../entities/country.entity';
import { UserRepositoryPort } from '../../ports/user.repository.port';

export class CountryService {
  constructor(
    private readonly countryRepository: CountryRepositoryPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async getCountries(
    page: number,
    limit: number,
  ): Promise<{ countries: Country[]; total: number }> {
    const countries = await this.countryRepository.findAll(page, limit, {
      createdAt: 'DESC',
    });
    const total = await this.countryRepository.count();

    const sanitizedCountries = countries.map((country) => {
      const { password: _, ...userWithoutPassword } = country.createdBy;
      return { ...country, createdBy: userWithoutPassword };
    });

    return { countries: sanitizedCountries, total };
  }

  async createCountry(
    user: User,
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    const userInst = await this.userRepository.findByEmail(user.email);
    if (!userInst) {
      throw Error('User not found');
    }
    const countryData: Country = {
      name: createCountryDto.name,
      createdAt: new Date(),
      createdBy: userInst,
    };
    const createdCountry = await this.countryRepository.create(countryData);

    const { password: _, ...userWithoutPassword } = createdCountry.createdBy;
    return { ...createdCountry, createdBy: userWithoutPassword };
  }

  async updateCountry(
    userId: string,
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const country = await this.countryRepository.findById(id);
    if (!country) throw new Error('Country not found');
    if (country.createdBy.id !== userId) {
      throw new Error('You can only edit your own countries');
    }
    const updatedCountry = await this.countryRepository.update(
      id,
      updateCountryDto,
    );

    const { password: _, ...userWithoutPassword } = updatedCountry.createdBy;
    return { ...updatedCountry, createdBy: userWithoutPassword };
  }

  async deleteCountry(userId: string, id: string): Promise<void> {
    const country = await this.countryRepository.findById(id);
    if (!country) throw new Error('Country not found');
    if (country.createdBy.id !== userId) {
      throw new Error('You can only delete your own countries');
    }
    await this.countryRepository.delete(id);
  }
}
