import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../../core/entities/user.entity';
import { CountryEntity } from './country.entity';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CountryEntity, (country) => country.createdBy)
  countries?: CountryEntity[];
}
