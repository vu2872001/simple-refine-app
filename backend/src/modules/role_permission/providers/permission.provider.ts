import { Permission } from '../entities/permission.model';

export const PermissionProviders = [
  {
    provide: 'PermissionRepository',
    useValue: Permission,
  },
];
