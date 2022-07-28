import { User } from '../entities/user.entity';

export function SerializeUser(user: User) {
  const newUser = { ...user };
  delete newUser.deletedAt;
  delete newUser.isActivate;
  delete newUser.password;
  delete newUser.permissions;
  delete newUser.currentHashedRefreshToken;

  return newUser;
}
