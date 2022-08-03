import { JwtAuthenticationGuard } from './jwt-authentication.guard';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from './../../user/services/user.service';
import { ConfigService } from '@nestjs/config';
import { RolePermissionService } from './../../role_permission/services/rolePermission.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from '../../../common/interface/requestWithUser.interface';

export const PermissionGuard = (permission: string): Type<CanActivate> => {
  @Injectable()
  class PermissionGuardMixin
    extends JwtAuthenticationGuard
    implements CanActivate
  {
    constructor(
      private readonly configService: ConfigService,
      private readonly rolePermissionService: RolePermissionService,
      private readonly userService: UserService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
    }

    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      let request;
      try {
        request = context.switchToHttp().getRequest<RequestWithUser>();
      } catch (error) {
        throw new UnauthorizedException(`You mush log in to system`);
      }
      const user = request.user;

      const listPermissions =
        await this.rolePermissionService.getPermissionByRole(user.role.id);
      const permissions = listPermissions.map((data) => {
        return data.permission;
      });
      return permissions.includes(permission);
    }
  }

  return mixin(PermissionGuardMixin);
};
