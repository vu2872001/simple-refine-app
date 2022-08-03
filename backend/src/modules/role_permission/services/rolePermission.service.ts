import { UserService } from './../../user/services/user.service';
import { PermissionRepository } from './../repository/permission.repository';
import { RoleRepository } from './../repository/role.repository';
import { CreateRolePermissionDTO } from '../dtos/createRolePermission.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RolePermissionRepository } from '../repository/rolePermission.repository';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { CreateRoleDTO } from '../dtos/createRole.dto';
import { CreateRoleDTO as UpdatedRoleDTO } from '../dtos/createRole.dto';
import { CreatePermissionDTO } from '../dtos/createPermission.dto';
import { CreatePermissionDTO as UpdatedPermissionDTO } from '../dtos/createPermission.dto';
import { SerializeRole } from '../serialize/role.serialize';
import { SerializePermission } from '../serialize/permission.serialize';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly userService: UserService,
  ) {}

  async createRolePermission(createRolePermissionDTO: CreateRolePermissionDTO) {
    const role = await this.roleRepository.getRoleById(
      createRolePermissionDTO.roleId,
    );
    const permission = await this.permissionRepository.getPermissionById(
      createRolePermissionDTO.permissionId,
    );
    if (!role || !permission) {
      throw new BadRequestException(`Data wrong`);
    }
    let rolePermissionExist = await this.getRolePermissionByValue_Force(
      role.id,
      permission.id,
    );
    if (!rolePermissionExist) {
      rolePermissionExist =
        await this.rolePermissionRepository.createRolePermission(
          createRolePermissionDTO,
        );
    } else if (rolePermissionExist.deletedAt !== null) {
      rolePermissionExist = await this.restoreRolePermission(
        role.id,
        permission.id,
      );
    } else {
      throw new BadRequestException(
        `Permission ${permission.permission} is already exist in role ${role.role}`,
      );
    }

    return rolePermissionExist;
  }

  async getRolePermissionByValue(roleId: number, permissionId: number) {
    return await this.rolePermissionRepository.getDataById(
      roleId,
      permissionId,
    );
  }

  async getRolePermissionByValue_Force(roleId: number, permissionId: number) {
    return await this.rolePermissionRepository.getDataById_Force(
      roleId,
      permissionId,
    );
  }

  async deleteByRole(id: number) {
    const permissions = await this.rolePermissionRepository.getDataByRoleId(id);
    Promise.all(
      permissions.map(async (permission) => {
        const isSuccess =
          await this.rolePermissionRepository.deleteRolePermission(
            permission.roleId,
            permission.permissionId,
          );
        if (isSuccess) {
          console.log(
            ` ${permission.permissionId} has been deleted from role ${permission.roleId}`,
          );
        }
      }),
    );
  }

  async restoreByRole(id: number) {
    const permissions =
      await this.rolePermissionRepository.getDataByRoleId_Force(id);
    Promise.all(
      permissions.map(async (permission) => {
        const defaultPermission =
          await this.permissionRepository.getPermissionById_Force(
            permission.permissionId,
          );
        if (defaultPermission.deletedAt === null) {
          const isSuccess =
            await this.rolePermissionRepository.restoreRolePermission(
              permission.roleId,
              permission.permissionId,
            );
          if (isSuccess) {
            console.log(
              `Permission ${permission.permissionId} has been restore from role ${permission.roleId}`,
            );
          }
        }
      }),
    );
  }

  async deleteByPermission(id: number) {
    const permissions =
      await this.rolePermissionRepository.getDataByPermissionId(id);
    Promise.all(
      permissions.map(async (permission) => {
        const data = await this.rolePermissionRepository.deleteRolePermission(
          permission.roleId,
          permission.permissionId,
        );
        if (data) {
          console.log(
            `Permission ${permission.permissionId} has been deleted from role ${permission.roleId}`,
          );
        }
      }),
    );
  }

  async restoreByPermission(id: number) {
    const permissions =
      await this.rolePermissionRepository.getDataByPermissionId_Force(id);
    Promise.all(
      permissions.map(async (permission) => {
        const defaultRole = await this.roleRepository.getRoleById_Force(
          permission.roleId,
        );
        if (defaultRole.deletedAt === null) {
          const data =
            await this.rolePermissionRepository.restoreRolePermission(
              permission.roleId,
              permission.permissionId,
            );
          if (data) {
            console.log(
              `Permission ${permission.permissionId} has been deleted from role ${permission.roleId}`,
            );
          }
        }
      }),
    );
  }

  async deleteRolePermission(roleId: number, permissionId: number) {
    try {
      const roleExist = await this.roleRepository.getRoleById(roleId);
      const permissionExist = await this.permissionRepository.getPermissionById(
        permissionId,
      );

      if (!roleExist) throw new BadRequestException(`Role does not exist`);
      if (!permissionExist)
        throw new BadRequestException(`Permission does not exist`);

      const rolePermissionExist =
        await this.rolePermissionRepository.getDataById(roleId, permissionId);
      if (rolePermissionExist) {
        const rolePermission =
          await this.rolePermissionRepository.deleteRolePermission(
            roleId,
            permissionId,
          );
        return rolePermission;
      } else
        throw new BadRequestException(
          `Permission ${permissionExist.permission} does not exist in role ${roleExist.role}`,
        );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async restoreRolePermission(roleId: number, permissionId: number) {
    try {
      const rolePermission =
        await this.rolePermissionRepository.restoreRolePermission(
          roleId,
          permissionId,
        );
      return rolePermission;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPermissionByRole(roleId: number) {
    const permissions = await this.rolePermissionRepository.getDataByRoleId(
      roleId,
    );
    const data = Promise.all(
      permissions.map(async (value) => {
        const permission = await this.permissionRepository.getPermissionById(
          value.permissionId,
        );
        return SerializePermission(permission);
      }),
    );
    return data;
  }

  /* Role Services */
  async getAllRole() {
    const roles = await this.roleRepository.getAllRole();
    const dataReturn = roles.map((role) => {
      return SerializeRole(role);
    });
    return dataReturn;
  }

  async getRoleById(id: number) {
    const user = await this.roleRepository.getRoleById(id);
    return user;
  }

  async getRoleData(pageOptionsDto: PageOptionsDTO) {
    const users = await this.roleRepository.getRoleWithPage(pageOptionsDto);
    return users;
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.getRoleByRoleValue(value);
  }

  async getRoleByValue_Force(value: string) {
    return await this.roleRepository.getRoleByRoleValue_Force(value);
  }

  async createRole(createData: CreateRoleDTO) {
    try {
      const role = await this.getRoleByValue(createData.role);
      if (role) {
        throw new BadRequestException(`Role ${createData.role} is exist`);
      }
      const newRole = await this.roleRepository.createRole(createData);
      return newRole;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRole(id: number, updateData: UpdatedRoleDTO) {
    try {
      const roleWithId = await this.getRoleById(id);
      if (Object.keys(roleWithId).length === 0) {
        throw new NotFoundException(`Not found role with id: ${id}`);
      }

      const updatedRole = await this.roleRepository.updateRole(id, updateData);
      return updatedRole;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteRole(id: number) {
    try {
      const role = await this.roleRepository.getRoleById_Force(id);
      if (Object.keys(role).length === 0 || role.deletedAt !== null) {
        throw new NotFoundException(`Not found role with id: ${id}`);
      }
      const userCount = await this.userService.getAllDataByRole(id);
      if (userCount) {
        throw new BadRequestException(
          `Cannot delete role ${role.role} because exist ${userCount} user(s) in this role`,
        );
      }
      await this.deleteByRole(id);
      return await this.roleRepository.deleteRole(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async restoreRole(id: number) {
    try {
      const role = await this.roleRepository.getRoleById_Force(id);
      if (Object.keys(role).length === 0) {
        throw new NotFoundException(`Not found role with id: ${id}`);
      } else if (role.deletedAt === null) {
        throw new BadRequestException(`Role with id: ${id} wasn't delete`);
      } else {
        const roleReturn = await this.roleRepository.restoreRole(id);
        await this.restoreByRole(id);
        return roleReturn;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /* Permission Service */
  async getAllPermission() {
    const permissions = await this.permissionRepository.getAllPermission();
    const data = Promise.all(
      permissions.map((permission) => {
        return SerializePermission(permission);
      }),
    );
    return data;
  }

  async getPermissionById(id: number) {
    const user = await this.permissionRepository.getPermissionById(id);
    return user;
  }

  async getPermissionData(pageOptionsDto: PageOptionsDTO) {
    const users = await this.permissionRepository.getPermissionWithPage(
      pageOptionsDto,
    );
    return users;
  }

  async getPermissionByValue(value: string) {
    return await this.permissionRepository.getPermissionByPermissionValue(
      value,
    );
  }

  async getPermissionByValue_Force(value: string) {
    return await this.permissionRepository.getPermissionByPermissionValue_Force(
      value,
    );
  }

  async createPermission(createData: CreatePermissionDTO) {
    try {
      const permission = await this.getPermissionByValue(createData.permission);
      if (permission)
        throw new BadRequestException(
          `permission ${createData.permission} is exist`,
        );
      const newPermission = await this.permissionRepository.createPermission(
        createData,
      );
      return newPermission;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePermission(id: number, updateData: UpdatedPermissionDTO) {
    try {
      const permissionWithId = await this.getPermissionById(id);
      if (Object.keys(permissionWithId).length === 0) {
        throw new NotFoundException(`Not found permission with id: ${id}`);
      }

      const updatedPermission =
        await this.permissionRepository.updatePermission(id, updateData);
      return updatedPermission;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePermission(id: number) {
    try {
      const permission =
        await this.permissionRepository.getPermissionById_Force(id);
      if (
        Object.keys(permission).length === 0 ||
        permission.deletedAt !== null
      ) {
        throw new NotFoundException(`Not found permission with id: ${id}`);
      }
      await this.deleteByPermission(id);
      return await this.permissionRepository.deletePermission(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async restorePermission(id: number) {
    try {
      const permission =
        await this.permissionRepository.getPermissionById_Force(id);
      if (Object.keys(permission).length === 0) {
        throw new NotFoundException(`Not found permission with id: ${id}`);
      } else if (permission.deletedAt === null) {
        throw new BadRequestException(`Role with id: ${id} wasn't delete`);
      } else {
        const permissionReturn =
          await this.permissionRepository.restorePermission(id);
        await this.restoreByPermission(id);
        return permissionReturn;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
