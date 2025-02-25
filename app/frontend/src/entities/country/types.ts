import { User } from '@/entities/user/types';

export interface Country {
  id: string;
  name: string;
  createdBy: User;
  createdAt: Date;
}

export type CountryFormData = Pick<Country, 'name'>;
