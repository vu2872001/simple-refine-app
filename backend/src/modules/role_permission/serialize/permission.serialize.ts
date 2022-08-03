import { Permission } from '../entities/permission.model';

export function SerializePermission(permission: Permission) {
  const newPermission = { ...permission };
  delete newPermission.deletedAt;
  delete newPermission.updatedAt;
  delete newPermission.createdAt;
  return newPermission;
}
