import { Country } from '../entities/country.entity';

export interface CountryRepositoryPort {
  findAll(
    page: number,
    limit: number,
    order?: { [key: string]: 'ASC' | 'DESC' },
  ): Promise<Country[]>;
  findById(id: string): Promise<Country | null>;
  create(country: Country): Promise<Country>;
  update(id: string, country: Partial<Country>): Promise<Country>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
