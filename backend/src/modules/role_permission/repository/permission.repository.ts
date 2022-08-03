import { Permission } from '../entities/permission.model';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePermissionDTO } from '../dtos/createPermission.dto';
import { PageDTO } from '../../../common/dtos/page.dto';
import { PageMetaDTO } from '../../../common/dtos/pageMeta.dto';
import { PermissionPageOptionsDTO } from '../dtos/permissionPageOptions.dto';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { CreatePermissionDTO as UpdatePermissionDTO } from '../dtos/createPermission.dto';
import { SerializePermission } from '../serialize/permission.serialize';

@Injectable()
export class PermissionRepository {
  constructor(
    @Inject('PermissionRepository')
    private permissionRepository: typeof Permission,
  ) {}

  async getPermissionById(id: number) {
    const permission = await this.permissionRepository.findByPk(id);
    return permission;
  }

  async getPermissionById_Force(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
      paranoid: false,
    });
    return permission;
  }

  async getPermissionByPermissionValue(name: string) {
    const permission = await this.permissionRepository.findOne({
      where: { permission: name },
    });
    return permission;
  }

  async getPermissionByPermissionValue_Force(name: string) {
    const permission = await this.permissionRepository.findOne({
      where: { permission: name },
      paranoid: false,
    });
    return permission;
  }

  async getAllPermission() {
    return await this.permissionRepository.findAll();
  }

  async createPermission(createPermissionDTO: CreatePermissionDTO) {
    let data;
    try {
      await this.permissionRepository
        .create({ ...createPermissionDTO })
        .then((result) => {
          data = SerializePermission(result.toJSON());
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updatePermission(id: number, updatePermissionDTO: UpdatePermissionDTO) {
    let data: Permission;
    try {
      await this.permissionRepository
        .update({ ...updatePermissionDTO }, { where: { id: id } })
        .then(async () => {
          data = await this.getPermissionById(id);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async deletePermission(id: number) {
    let data = false;
    try {
      await this.permissionRepository
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

  async restorePermission(id: number) {
    let data: Permission;
    try {
      await this.permissionRepository
        .restore({ where: { id: id } })
        .then(async () => {
          data = await this.getPermissionById(id);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getPermissionWithPage(pageOptionsDto: PageOptionsDTO) {
    try {
      const userPageOptions: PermissionPageOptionsDTO =
        new PermissionPageOptionsDTO(pageOptionsDto.page, pageOptionsDto.take);
      const permissionCount = await this.permissionRepository.count({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
      });

      const permissions = await this.permissionRepository.findAll({
        // where: pageOptionsDto.where,
        // order: pageOptionsDto.order,
        offset: (userPageOptions.page - 1) * userPageOptions.take,
        limit: userPageOptions.take,
      });

      const dataReturn: PageDTO<Permission> = new PageDTO(
        permissions,
        new PageMetaDTO({
          pageOptionsDTO: userPageOptions,
          itemCount: permissionCount,
        }),
      );
      return dataReturn;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
