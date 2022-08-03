import { User } from '../../user/entities/user.model';

export function SerializeUser(user: User) {
  const newUser = { ...user };
  delete newUser.deletedAt;
  delete newUser.isActivate;
  delete newUser.password;
  delete newUser.currentHashedRefreshToken;
  return newUser;
}
