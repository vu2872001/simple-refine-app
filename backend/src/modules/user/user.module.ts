import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserProviders } from './providers/user.providers';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controllers/user.controller';
import { RolePermissionModule } from './../role_permission/rolePermission.module';

@Module({
  imports: [forwardRef(() => RolePermissionModule), ConfigModule],
  providers: [UserService, UserRepository, ...UserProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
