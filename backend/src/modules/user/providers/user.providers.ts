import { User } from '../entities/user.model';

export const UserProviders = [
  {
    provide: 'UserRepository',
    useValue: User,
  },
];
