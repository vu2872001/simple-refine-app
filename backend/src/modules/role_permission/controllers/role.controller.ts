import {
  Get,
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDTO } from '../dtos/createRole.dto';
import { FindOneParams } from 'src/utils/findOneParams';
import { SerializeRole } from '../serialize/role.serialize';
import { PermissionGuard } from './../../auth/guards/permission.guard';
import Permission from '../../../common/constants/permission.constant';
import { RolePermissionService } from '../services/rolePermission.service';
import { CreateRolePermissionDTO } from '../dtos/createRolePermission.dto';

@Controller('/role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly rolePermisionService: RolePermissionService) {}

  //@UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(Permission.ViewAllRole))
  @Get('/all')
  async getAllRole() {
    return await this.rolePermisionService.getAllRole();
  }

  @UseGuards(PermissionGuard(Permission.AddRole))
  @Post('/create')
  async createRole(@Body() createData: CreateRoleDTO) {
    const role = await this.rolePermisionService.createRole(createData);
    return SerializeRole(role);
  }

  @UseGuards(PermissionGuard(Permission.DeleteRole))
  @Delete('/:id/delete')
  async deleteRole(@Param() { id }: FindOneParams) {
    await this.rolePermisionService.deleteRole(Number(id));
  }

  @UseGuards(PermissionGuard(Permission.RestoreRole))
  @HttpCode(200)
  @Post('/:id/restore')
  async restoreRole(@Param() { id }: FindOneParams) {
    const role = await this.rolePermisionService.restoreRole(Number(id));
    return SerializeRole(role);
  }

  @UseGuards(PermissionGuard(Permission.GetPermissionByRole))
  @Get('/:id/permission')
  async getPermissionByRole(@Param() { id }: FindOneParams) {
    const permissions = await this.rolePermisionService.getPermissionByRole(
      Number(id),
    );
    return permissions;
  }

  @UseGuards(PermissionGuard(Permission.SetPermissionToRole))
  @Post('/:id/create')
  async setPermissionToRole(
    @Param() { id }: FindOneParams,
    @Body() createData: CreateRolePermissionDTO,
  ) {
    console.log(id, createData);
    if (Number(id) !== createData.roleId) {
      throw new BadRequestException(`Something went wrong when set permission`);
    }
    await this.rolePermisionService.createRolePermission(createData);
    return true;
  }

  @UseGuards(PermissionGuard(Permission.RemovePermissionOfRole))
  @Delete('/:id/delete-permission')
  async deletePermissionOfRole(
    @Param() { id }: FindOneParams,
    @Body() createData: CreateRolePermissionDTO,
  ) {
    if (Number(id) !== createData.roleId) {
      throw new BadRequestException(
        `Something went wrong when delete permission`,
      );
    }
    await this.rolePermisionService.deleteRolePermission(
      createData.roleId,
      createData.permissionId,
    );
    return true;
  }
}
