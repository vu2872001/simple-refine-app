import { User } from '../entities/user.model';

export function SerializeUser(user: User) {
  const newUser = { ...user };
  delete newUser.deletedAt;
  delete newUser.updatedAt;
  delete newUser.createdAt;
  delete newUser.isActivate;
  delete newUser.password;
  // delete newUser.permissions;
  delete newUser.currentHashedRefreshToken;

  return newUser;
}
