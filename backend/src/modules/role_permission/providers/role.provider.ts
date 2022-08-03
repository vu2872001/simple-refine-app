import { Role } from '../entities/role.model';

export const RoleProviders = [
  {
    provide: 'RoleRepository',
    useValue: Role,
  },
];
