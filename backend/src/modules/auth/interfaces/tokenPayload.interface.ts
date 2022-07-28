import { User } from '../../user/entities/user.entity';

export interface TokenPayload {
  user: User;
}
