import { RolePermission } from '../entities/rolePermission.model';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRolePermissionDTO } from '../dtos/createRolePermission.dto';

@Injectable()
export class RolePermissionRepository {
  constructor(
    @Inject('RolePermissionRepository')
    private rolePermissionRepository: typeof RolePermission,
  ) {}

  async createRolePermission(createData: CreateRolePermissionDTO) {
    let data: RolePermission;
    try {
      await this.rolePermissionRepository
        .create({ ...createData })
        .then((result) => {
          data = result;
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getAllRole() {
    try {
      return await this.rolePermissionRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataById(roleId: number, permissionId: number) {
    try {
      return await this.rolePermissionRepository.findOne({
        where: {
          roleId: roleId,
          permissionId: permissionId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataById_Force(roleId: number, permissionId: number) {
    try {
      return await this.rolePermissionRepository.findOne({
        where: {
          roleId: roleId,
          permissionId: permissionId,
        },
        paranoid: false,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataByRoleId(id: number) {
    try {
      const data = await this.rolePermissionRepository.findAll({
        where: { roleId: id },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataByRoleId_Force(id: number) {
    try {
      const data = await this.rolePermissionRepository.findAll({
        where: { roleId: id },
        paranoid: false,
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataByPermissionId(id: number) {
    try {
      const data = await this.rolePermissionRepository.findAll({
        where: { permissionId: id },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDataByPermissionId_Force(id: number) {
    try {
      const data = await this.rolePermissionRepository.findAll({
        where: { permissionId: id },
        paranoid: false,
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteRolePermission(roleId: number, permissionId: number) {
    let data = false;
    try {
      await this.rolePermissionRepository
        .destroy({ where: { roleId: roleId, permissionId: permissionId } })
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

  async restoreRolePermission(roleId: number, permissionId: number) {
    let data: RolePermission;
    try {
      await this.rolePermissionRepository
        .restore({ where: { roleId: roleId, permissionId: permissionId } })
        .then(async () => {
          data = await this.getDataById(roleId, permissionId);
        })
        .catch((error) => {
          throw new InternalServerErrorException(error.message);
        });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
