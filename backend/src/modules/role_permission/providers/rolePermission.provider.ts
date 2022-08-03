import { RolePermission } from '../entities/rolePermission.model';

export const RolePermissionProviders = [
  {
    provide: 'RolePermissionRepository',
    useValue: RolePermission,
  },
];
