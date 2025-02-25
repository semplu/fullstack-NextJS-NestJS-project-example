import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Country } from '../../../core/entities/country.entity';

@Entity('countries')
export class CountryEntity implements Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.countries)
  createdBy: UserEntity;
}
