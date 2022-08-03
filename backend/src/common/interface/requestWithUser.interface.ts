import { Request } from 'express';
import { User } from '../../modules/user/entities/user.model';

export interface RequestWithUser extends Request {
  user: User;
}
