import { ConfigModule } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { PermissionRepository } from './repository/permission.repository';
import { Module, forwardRef } from '@nestjs/common';
import { RolePermissionService } from './services/rolePermission.service';
import { RolePermissionRepository } from './repository/rolePermission.repository';
import { RolePermissionProviders } from './providers/rolePermission.provider';
import { RoleRepository } from './repository/role.repository';
import { RoleProviders } from './providers/role.provider';
import { PermissionProviders } from './providers/permission.provider';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  providers: [
    RolePermissionService,
    RolePermissionRepository,
    PermissionRepository,
    RoleRepository,
    ...RolePermissionProviders,
    ...PermissionProviders,
    ...RoleProviders,
  ],
  exports: [
    RolePermissionService,
    RolePermissionRepository,
    PermissionRepository,
    RoleRepository,
  ],
  controllers: [RoleController, PermissionController],
})
export class RolePermissionModule {}
