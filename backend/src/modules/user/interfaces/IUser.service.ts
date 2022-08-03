import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';

export interface IUserService {
  getUserByEmail(email: string);
  updatePassword(id: number, updatePassword: UpdatePasswordDTO);
}
