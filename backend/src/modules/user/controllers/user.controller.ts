import { PermissionGuard } from './../../auth/guards/permission.guard';
import {
  Req,
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  UseInterceptors,
  BadRequestException,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UserPageDTO } from '../dtos/userPage.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { UserService } from '../services/user.service';
import { FindOneParams } from '../../../utils/findOneParams';
import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';
// import { RoleGuard } from '../../auth/guards/role.guard';
// import { Role } from '../../../common/constants/role.constant';
// import { JwtAuthenticationGuard } from '../../auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '../../../common/interface/requestWithUser.interface';
import Permission from '../../../common/constants/permission.constant';

@Controller('/user')
@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(PermissionGuard(Permission.ViewAllUser))
  @Get('/all')
  async getAllUser(@Body() pageOption: UserPageDTO) {
    return await this.userService.getAllData(pageOption);
  }

  // @UseGuards(JwtAuthenticationGuard)
  @UseGuards(PermissionGuard(Permission.ViewMyDetails))
  @Get('/me')
  async authenticate(@Req() request: RequestWithUser) {
    return await this.userService.getDataById(Number(request.user.id));
  }

  @UseGuards(PermissionGuard(Permission.ViewAllPermissions))
  @Get('/:id')
  async ViewUser(@Param() { id }: FindOneParams) {
    return this.userService.getDataById(Number(id));
  }

  @UseGuards(PermissionGuard(Permission.EditUser))
  @Put('/update/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UpdateUserDTO,
  ) {
    return this.userService.update(Number(id), user);
  }

  // @UseGuards(JwtAuthenticationGuard)
  @UseGuards(PermissionGuard(Permission.UpdateInfomation))
  @Put('/me/update/')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  async updateMyInfo(
    @Req() request: RequestWithUser,
    @Body() user: UpdateUserDTO,
  ) {
    return this.userService.update(Number(request.user.id), user);
  }

  @HttpCode(200)
  // @UseGuards(JwtAuthenticationGuard)
  @UseGuards(PermissionGuard(Permission.EditPassword))
  @Post('/update/password')
  async updatePassword(
    @Req() request: RequestWithUser,
    @Body() updatePassword: UpdatePasswordDTO,
  ) {
    const userId = request.user.id;
    return await this.userService.updatePassword(userId, updatePassword);
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(Permission.DeleteUser))
  @Delete('/delete/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  async DeleteUserByID(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
  ) {
    const userId = request.user.id;
    if (userId === Number(id)) {
      throw new BadRequestException(`You can't delete yourself'`);
    }
    return await this.userService.delete(Number(id));
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(Permission.RestoreUser))
  @Put('/restore/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  async RestoreUserByID(@Param() { id }: FindOneParams) {
    return await this.userService.restore(Number(id));
  }
}
