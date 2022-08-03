import { Role as RoleModel } from './../../role_permission/entities/role.model';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { User } from '../entities/user.model';
import { UserReturn } from '../dtos/userReturn.dto';
import { PageDTO } from '../../../common/dtos/page.dto';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { SerializeUser } from '../serialize/user.serialize';
import { Role } from '../../../common/constants/role.constant';
import { PageMetaDTO } from '../../../common/dtos/pageMeta.dto';
import { UserPageOptionsDTO } from '../dtos/userPageOptions.dto';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { RoleRepository } from './../../role_permission/repository/role.repository';

@Injectable()
export class UserRepository {
  constructor(
    // @InjectModel(User)
    @Inject('UserRepository')
    private userRepository: typeof User,
    private roleRepository: RoleRepository,
  ) {}

  async getAllUser() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    //const user = await this.findOne({ where: { id: id } });
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Not found user with id: ${id}`);
    }
    const role = await this.roleRepository.getRoleById(user.roleId);
    user['role'] = role;
    return new UserReturn(user);
  }

  async getUserByIdAndPassword(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: RoleModel,
      raw: true,
      nest: true,
    });
    return user;
  }

  async getUserByRole(roleId: number) {
    return await this.userRepository.count({
      where: { roleId: roleId },
    });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    let data: UserReturn;
    let role;
    try {
      const user = {
        ...createUserDTO,
        name: createUserDTO.email,
        username: createUserDTO.email,
      };

      if (user.email === 'admin@gmail.com') {
        role = await this.roleRepository.getRoleByRoleValue(Role.Admin);
        user['roleId'] = role.id;
      } else {
        role = await this.roleRepository.getRoleByRoleValue(Role.User);
        user['roleId'] = role.id;
      }

      await this.userRepository
        .create(user)
        .then((result) => {
          result = result.toJSON();
          result['role'] = role;
          data = new UserReturn(result);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    let data: UserReturn;
    try {
      await this.userRepository
        .update({ ...updateUserDTO }, { where: { id: id } })
        .then(async () => {
          data = await this.getUserById(id);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateUserPassword(id: number, hashedPassword: string) {
    let data: UserReturn;
    try {
      await this.userRepository
        .update({ password: hashedPassword }, { where: { id: id } })
        .then(async () => {
          data = await this.getUserById(id);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async deleteUser(id: number) {
    let data = false;
    try {
      await this.userRepository
        .update({ isActivate: false }, { where: { id: id } })
        .then(async () => {
          await this.userRepository
            .destroy({ where: { id: id } })
            .then(() => {
              data = true;
            })
            .catch((error) => {
              throw new InternalServerErrorException(error.message);
            });
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async restoreUser(id: number) {
    let data: UserReturn;
    try {
      await this.userRepository
        .restore({ where: { id: id } })
        .then(async () => {
          await this.userRepository
            .update({ isActivate: true }, { where: { id: id } })
            .then(async () => {
              data = await this.getUserById(id);
            })
            .catch((error) => {
              throw new InternalServerErrorException(error.message);
            });
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async getUserWithPage(pageOptionsDto: PageOptionsDTO) {
    try {
      const userPageOptions: UserPageOptionsDTO = new UserPageOptionsDTO(
        pageOptionsDto.page,
        pageOptionsDto.take,
      );
      const userCount = await this.userRepository.count({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
      });

      const users = await this.userRepository.findAll({
        include: RoleModel,
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
        offset: (userPageOptions.page - 1) * userPageOptions.take,
        limit: userPageOptions.take,
        raw: true,
        nest: true,
      });

      const serializeUser = users.map((user: User) => {
        return new UserReturn(user);
      });

      const dataReturn: PageDTO<UserReturn> = new PageDTO(
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
      await this.userRepository.update(
        {
          currentHashedRefreshToken: null,
        },
        { where: { id: id } },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByIdWithCookie(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      const serializeUser = SerializeUser(user);
      return {
        ...serializeUser,
        currentHashedRefreshToken: user.currentHashedRefreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateToken(id: number, currentHashedRefreshToken: string) {
    try {
      await this.userRepository.update(
        {
          currentHashedRefreshToken,
        },
        { where: { id: id } },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
