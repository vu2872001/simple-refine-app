import { User } from '../entities/user.entity';
import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';

export interface IUserService {
  getUserByEmail(email: string): Promise<User>;
  updatePassword(id: number, updatePassword: UpdatePasswordDTO): Promise<User>;
}
