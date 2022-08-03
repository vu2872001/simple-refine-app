import { Role } from '../entities/role.model';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRoleDTO } from '../dtos/createRole.dto';
import { PageDTO } from '../../../common/dtos/page.dto';
import { PageMetaDTO } from '../../../common/dtos/pageMeta.dto';
import { RolePageOptionsDTO } from '../dtos/rolePageOptions.dto';
import { SerializeRole } from '../serialize/role.serialize';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { CreateRoleDTO as UpdateRoleDTO } from '../dtos/createRole.dto';

@Injectable()
export class RoleRepository {
  constructor(@Inject('RoleRepository') private roleRepository: typeof Role) {}

  async getRoleById(id: number) {
    const role = await this.roleRepository.findByPk(id);
    return role;
  }

  async getRoleById_Force(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id: id },
      paranoid: false,
    });
    return role;
  }

  async getRoleByRoleValue(name: string) {
    const role = await this.roleRepository.findOne({ where: { role: name } });
    return role;
  }

  async getRoleByRoleValue_Force(name: string) {
    const role = await this.roleRepository.findOne({
      where: { role: name },
      paranoid: false,
    });
    return role;
  }

  async getAllRole() {
    return await this.roleRepository.findAll();
  }

  async createRole(createRoleDTO: CreateRoleDTO) {
    let data;
    try {
      await this.roleRepository
        .create({ ...createRoleDTO })
        .then((result) => {
          data = SerializeRole(result.toJSON());
        })
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateRole(id: number, updateRoleDTO: UpdateRoleDTO) {
    let data: Role;
    try {
      await this.roleRepository
        .update({ ...updateRoleDTO }, { where: { id: id } })
        .then(async () => {
          data = await this.getRoleById(id);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async deleteRole(id: number) {
    let data = false;
    try {
      await this.roleRepository
        .destroy({ where: { id: id } })
        .then(() => {
          data = true;
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async restoreRole(id: number) {
    let data: Role;
    try {
      await this.roleRepository
        .restore({ where: { id: id } })
        .then(async () => {
          data = await this.getRoleById(id);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getRoleWithPage(pageOptionsDto: PageOptionsDTO) {
    try {
      const userPageOptions: RolePageOptionsDTO = new RolePageOptionsDTO(
        pageOptionsDto.page,
        pageOptionsDto.take,
      );
      const roleCount = await this.roleRepository.count({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
      });

      const roles = await this.roleRepository.findAll({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
        offset: (userPageOptions.page - 1) * userPageOptions.take,
        limit: userPageOptions.take,
      });

      const dataReturn: PageDTO<Role> = new PageDTO(
        roles,
        new PageMetaDTO({
          pageOptionsDTO: userPageOptions,
          itemCount: roleCount,
        }),
      );
      return dataReturn;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
