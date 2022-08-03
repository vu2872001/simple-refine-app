import { Role } from '../entities/role.model';

export function SerializeRole(role: Role) {
  const newRole = { ...role };
  delete newRole.deletedAt;
  delete newRole.updatedAt;
  delete newRole.createdAt;
  return newRole;
}
