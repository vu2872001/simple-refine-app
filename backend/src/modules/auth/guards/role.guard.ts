import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { Role } from '../../../common/constants/role.constant';
import { JwtAuthenticationGuard } from './jwt-authentication.guard';
import { RequestWithUser } from '../../../common/interface/requestWithUser.interface';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
