import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { Country } from '../../core/entities/country.entity';
import { CountryRepositoryPort } from '../../core/ports/country.repository.port';

@Injectable()
export class CountryRepositoryAdapter implements CountryRepositoryPort {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    order: { [key: string]: 'ASC' | 'DESC' } = { createdAt: 'DESC' },
  ): Promise<Country[]> {
    return this.countryRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['createdBy'],
      order,
    });
  }

  async findById(id: string): Promise<Country | null> {
    return this.countryRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  }

  async create(country: Partial<Country>): Promise<Country> {
    const countryEntity = this.countryRepository.create(country);
    return this.countryRepository.save(countryEntity);
  }

  async update(id: string, country: Partial<Country>): Promise<Country> {
    await this.countryRepository.update(id, country);
    return this.findById(id) as Promise<Country>;
  }

  async delete(id: string): Promise<void> {
    await this.countryRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.countryRepository.count();
  }
}
