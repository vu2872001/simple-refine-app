import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { PageDTO } from '../../../common/dtos/page.dto';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import Permission from '../../auth/types/permission.type';
import { SerializeUser } from '../serialize/user.serialize';
import { SerializeUser as SerializeAuth } from '../../auth/serialize/user.serialize';
import { Role } from '../../../common/constants/role.constant';
import { PageMetaDTO } from '../../../common/dtos/pageMeta.dto';
import { UserPageOptionsDTO } from '../dtos/userPageOptions.dto';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async getAllUser(): Promise<User[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.findOne({ where: { id: id } });
      return SerializeUser(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataByIdWithPermission(id: number): Promise<User> {
    try {
      const user = await this.findOne({ where: { id: id } });
      console.log(user)
      return SerializeAuth(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByIdAndPassword(id: number): Promise<User> {
    try {
      return await this.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      let user = {
        ...createUserDTO,
        name: createUserDTO.email,
        username: createUserDTO.email,
        permissions: [],
      };

      if (user.email === this.configService.get('ADMIN_USER_EMAIL')) {
        Object.keys(Permission).forEach((permission) => {
          user.permissions.push(permission);
        });
        user['role'] = Role.Admin;
      }

      const newUser = await this.create(user);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.getUserById(id);
      const updatedUser = { ...user, ...updateUserDTO };
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUserPassword(id: number, hashedPassword: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { id: id } });
      const newUser = { ...user, password: hashedPassword };

      await this.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await this.getUserById(id);
      const deletedUser = { ...user, isActivate: false };
      await this.save(deletedUser);

      const deletedResponse = await this.softDelete(id);
      if (!deletedResponse.affected) {
        throw new NotFoundException(`User with id: ${id} does not exist`);
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async restoreUser(id: number): Promise<User> {
    try {
      const restoreResponse = await this.restore(id);
      if (!restoreResponse.affected) {
        throw new NotFoundException(`User with id: ${id} does not exist`);
      }

      const user = await this.getUserById(id);
      const restoredUser = { ...user, isActivate: true };
      return restoredUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserWithPage(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<PageDTO<User>> {
    try {
      const userPageOptions: UserPageOptionsDTO = new UserPageOptionsDTO(
        pageOptionsDto.page,
        pageOptionsDto.take,
      );

      const userCount = await this.count({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
      });

      const users = await this.find({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
        skip: (userPageOptions.page - 1) * userPageOptions.take,
        take: userPageOptions.take,
      });

      const serializeUser = users.map((user: User) => {
        return SerializeUser(user);
      });

      const dataReturn: PageDTO<User> = new PageDTO(
        serializeUser,
        new PageMetaDTO({
          pageOptionsDTO: userPageOptions,
          itemCount: userCount,
        }),
      );

      return dataReturn;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeRefreshToken(id: number) {
    try {
      await this.update(id, {
        currentHashedRefreshToken: null,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByIdWithCookie(id: number) {
    try {
      const user = await this.findOne({ where: { id: id } });
      const serializeUser = SerializeUser(user);
      return {
        ...serializeUser,
        currentHashedRefreshToken: user.currentHashedRefreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
