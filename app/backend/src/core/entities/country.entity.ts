import { User } from './user.entity';

export interface Country {
  id?: string;
  name: string;
  createdAt: Date;
  createdBy: User;
}
