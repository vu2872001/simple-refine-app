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

import { ApiTags, ApiParam } from '@nestjs/swagger';
import { UserPageDTO } from '../dtos/userPage.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { UserService } from '../services/user.service';
// import { RoleGuard } from '../../auth/guards/role.guard';
import { FindOneParams } from '../../../utils/findOneParams';
// import { Role } from '../../../common/constants/role.constant';
import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { JwtAuthenticationGuard } from '../../auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '../../../common/interface/requestWithUser.interface';
import UserPermission from '../permission/user.permission';

@Controller('user')
@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('/me')
  async authenticate(@Req() request: RequestWithUser) {
    return await this.userService.getDataById(request.user.id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('/update/password')
  async updatePassword(
    @Req() request: RequestWithUser,
    @Body() updatePassword: UpdatePasswordDTO,
  ) {
    const userId = request.user.id;
    return await this.userService.updatePassword(userId, updatePassword);
  }

  //@UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(UserPermission.ViewAllUser))
  @Get('/all')
  async getAllUser(@Body() pageOption: UserPageDTO) {
    return await this.userService.getAllData(pageOption);
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(PermissionGuard(UserPermission.DeleteUser))
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
  @UseGuards(PermissionGuard(UserPermission.DeleteUser))
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
