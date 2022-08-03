import { RequestWithUser } from './../../../common/interface/requestWithUser.interface';
import {
  Req,
  Get,
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreatePermissionDTO } from '../dtos/createPermission.dto';
import { PermissionGuard } from './../../auth/guards/permission.guard';
import Permission from '../../../common/constants/permission.constant';
import { SerializePermission } from '../serialize/permission.serialize';
import { RolePermissionService } from '../services/rolePermission.service';

@Controller('/permission')
@ApiTags('permission')
export class PermissionController {
  constructor(private readonly rolePermisionService: RolePermissionService) {}

  //@UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(Permission.ViewAllPermissions))
  @Get('/all')
  async getAllPermission() {
    return await this.rolePermisionService.getAllPermission();
  }

  @UseGuards(PermissionGuard(Permission.ViewMyPermissions))
  @Get('/my-permissions')
  async getMyPermissions(@Req() request: RequestWithUser) {
    const role = request.user.role;
    const permissions = await this.rolePermisionService.getPermissionByRole(
      role.id,
    );
    const dataReturn = permissions.map((permission) => {
      return permission.permission;
    });

    return dataReturn;
  }

  @UseGuards(PermissionGuard(Permission.AddPermission))
  @Post('/create')
  async createPermission(@Body() createData: CreatePermissionDTO) {
    const permission = await this.rolePermisionService.createPermission(
      createData,
    );
    return SerializePermission(permission);
  }

  @UseGuards(PermissionGuard(Permission.DeletePermission))
  @Delete('/:id/delete')
  async deletePermission(@Param() { id }: FindOneParams) {
    await this.rolePermisionService.deletePermission(Number(id));
  }

  @UseGuards(PermissionGuard(Permission.RestorePermission))
  @HttpCode(200)
  @Post('/:id/restore')
  async restorePermission(@Param() { id }: FindOneParams) {
    const permission = await this.rolePermisionService.restorePermission(
      Number(id),
    );
    return SerializePermission(permission);
  }
}
