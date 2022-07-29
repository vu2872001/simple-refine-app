import {
  Logger,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { PageDTO } from '../../../common/dtos/page.dto';
import { IUserService } from '../interfaces/iUser.service';
import { SerializeUser } from '../serialize/user.serialize';
import { UserRepository } from '../repository/user.repository';
import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { IBaseService } from '../../../common/interface/iBase.service';

@Injectable()
export class UserService
  implements IBaseService<User, CreateUserDTO, UpdateUserDTO>, IUserService
{
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async create(createData: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.createUser(createData);
    await this.userRepository.save(user);

    return SerializeUser(user);
  }

  async update(id: number, updateData: UpdateUserDTO): Promise<User> {
    try {
      const userWithId = await this.getDataById(id);

      if (Object.keys(userWithId).length === 0) {
        throw new NotFoundException(`Not found user with id: ${id}`);
      } else if (userWithId.email !== updateData.email) {
        const userWithEmail = await this.userRepository.getUserByEmail(
          updateData.email,
        );

        if (userWithEmail.id !== id) {
          throw new BadRequestException(
            `Email: ${updateData.email} exist. You can not change your mail to this mail`,
          );
        }
      }

      const updatedUser = await this.userRepository.updateUser(id, updateData);
      await this.userRepository.save(updatedUser);
      return SerializeUser(updatedUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.getDataById(id);
    if (Object.keys(user).length === 0) {
      this.logger.debug(`Tried to access a user with id: ${id} does not exist`);
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }

    return await this.userRepository.deleteUser(id);
  }

  async restore(id: number): Promise<User> {
    const user = await this.userRepository.restoreUser(id);
    return SerializeUser(user);
  }

  async updatePassword(
    id: number,
    updatePassword: UpdatePasswordDTO,
  ): Promise<User> {
    if (updatePassword.confirmPassword !== updatePassword.newPassword) {
      throw new BadRequestException(`Confirm password does not match`);
    }

    const user = await this.userRepository.getUserByIdAndPassword(id);
    await this.verifyPassword(updatePassword.oldPassword, user.password);
    const hashedPassword = await bcrypt.hash(updatePassword.newPassword, 10);

    return await this.userRepository.updateUserPassword(id, hashedPassword);
  }

  async getAllData(pageOptionsDto: PageOptionsDTO) {
    const users = await this.userRepository.getUserWithPage(pageOptionsDto);
    return users;
  }

  async getDataById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isMatchingPassword = await bcrypt.compare(password, hashedPassword);
    if (!isMatchingPassword) {
      throw new BadRequestException('Wrong password');
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.getUserByIdWithCookie(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return SerializeUser(user);
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.removeRefreshToken(userId);
  }

  async getDataByIdWithPermission(userId: number){
    return this.userRepository.getDataByIdWithPermission(userId);
  }
}
