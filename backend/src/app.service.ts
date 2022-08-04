import { OnModuleInit, Injectable } from '@nestjs/common';
import { Role } from './common/constants/role.constant';
import Permission from './common/constants/permission.constant';
import UserPermission from './common/constants/role/user.permission';
import { RolePermissionService } from './modules/role_permission/services/rolePermission.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  async onModuleInit() {
    console.log(`Initialization Module...`);
    await this.init();
    // await this.deleteSomewhere();
    // await this.restoreSomewhere();
    // console.log(`Initialize Completed`);
  }

  async init() {
    await this.initRole();
    await this.initPermission();
    await this.initRolePermission();
  }

  async deleteSomewhere() {
    await this.deletePermission();
    // await this.deleteRole();
    // await this.deleteRolePermission();
  }

  async restoreSomewhere() {
    await this.restorePermission();
    // await this.deletePermission()
  }

  async initRole() {
    console.log('Initialize Role...');
    const roleData = Object.keys(Role);
    await Promise.all(
      roleData.map(async (data) => {
        let roleExist = await this.rolePermissionService.getRoleByValue_Force(
          data,
        );
        if (!roleExist) {
          roleExist = await this.rolePermissionService.createRole({
            role: data,
            normalizeName: Role[data],
          });
        } else if (roleExist.deletedAt !== null) {
          roleExist = await this.rolePermissionService.restoreRole(
            roleExist.id,
          );
        }
        console.log(
          `\t Create Role ${roleExist.role} with value "${roleExist.normalizeName}" completed`,
        );
      }),
    );
  }

  async initPermission() {
    console.log('Initialize Permission...');
    const permissionData = Object.keys(Permission);
    await Promise.all(
      permissionData.map(async (data) => {
        let permissionExist =
          await this.rolePermissionService.getPermissionByValue_Force(data);
        if (!permissionExist) {
          permissionExist = await this.rolePermissionService.createPermission({
            permission: data,
            info: Permission[data],
          });
        } else if (permissionExist.deletedAt !== null) {
          permissionExist = await this.rolePermissionService.restorePermission(
            permissionExist.id,
          );
        }
        console.log(
          `\t Create Permission ${permissionExist.permission} with info "${permissionExist.info}" completed`,
        );
      }),
    );
  }

  async initRolePermission() {
    console.log('Initialize Role Permission...');
    const adminPermissionData = Object.keys(Permission);
    const userPermissionData = Object.keys(UserPermission);
    const roleAdmin = await this.rolePermissionService.getRoleByValue(
      Role.Admin,
    );
    const roleUser = await this.rolePermissionService.getRoleByValue(Role.User);
    const roleManager = await this.rolePermissionService.getRoleByValue(Role.Manager);

    await Promise.all(
      adminPermissionData.map(async (data) => {
        const permissionExist =
          await this.rolePermissionService.getPermissionByValue(data);
        let rolePermissionExist =
          await this.rolePermissionService.getRolePermissionByValue_Force(
            roleAdmin.id,
            permissionExist.id,
          );
        if (!rolePermissionExist) {
          rolePermissionExist =
            await this.rolePermissionService.createRolePermission({
              roleId: roleAdmin.id,
              permissionId: permissionExist.id,
            });
        } else if (rolePermissionExist.deletedAt !== null) {
          rolePermissionExist =
            await this.rolePermissionService.restoreRolePermission(
              roleAdmin.id,
              permissionExist.id,
            );
        }
        console.log(
          `\t Set Permission "${permissionExist.permission}" to role "${Role.Admin}" completed`,
        );
      }),
    );

    await Promise.all(
      userPermissionData.map(async (data) => {
        const permissionExist =
          await this.rolePermissionService.getPermissionByValue(data);
        let rolePermissionExist =
          await this.rolePermissionService.getRolePermissionByValue_Force(
            roleManager.id,
            permissionExist.id,
          );
        if (!rolePermissionExist) {
          rolePermissionExist =
            await this.rolePermissionService.createRolePermission({
              roleId: roleManager.id,
              permissionId: permissionExist.id,
            });
        } else if (rolePermissionExist.deletedAt !== null) {
          rolePermissionExist =
            await this.rolePermissionService.restoreRolePermission(
              roleManager.id,
              permissionExist.id,
            );
        }
        console.log(
          `\t Set Permission "${permissionExist.permission}" to role "${Role.Manager}" completed`,
        );
      }),
    );

    await Promise.all(
      userPermissionData.map(async (data) => {
        const permissionExist =
          await this.rolePermissionService.getPermissionByValue(data);
        let rolePermissionExist =
          await this.rolePermissionService.getRolePermissionByValue_Force(
            roleUser.id,
            permissionExist.id,
          );
        if (!rolePermissionExist) {
          rolePermissionExist =
            await this.rolePermissionService.createRolePermission({
              roleId: roleUser.id,
              permissionId: permissionExist.id,
            });
        } else if (rolePermissionExist.deletedAt !== null) {
          rolePermissionExist =
            await this.rolePermissionService.restoreRolePermission(
              roleUser.id,
              permissionExist.id,
            );
        }
        console.log(
          `\t Set Permission "${permissionExist.permission}" to role "${Role.User}" completed`,
        );
      }),
    );
  }

  async deletePermission() {
    console.log('Delete Role Permission...');
    await this.rolePermissionService.deletePermission(1);
    await this.rolePermissionService.deletePermission(2);
  }

  async deleteRole() {
    console.log('Delete Role Permission...');
    await this.rolePermissionService.deleteRole(2);
  }

  async deleteRolePermission() {
    console.log('Delete Role Permission...');
    await this.rolePermissionService.deleteRolePermission(1, 2);
  }

  async restorePermission() {
    console.log(`Restore Role Permission...`);
    await this.rolePermissionService.restorePermission(1);
  }
}
