import { Country } from './country.entity';

export interface User {
  id?: string;
  email: string;
  password?: string;
  countries?: Country[];
}
