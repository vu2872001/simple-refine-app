import { Role } from '../../modules/role_permission/entities/role.model';
import { User } from '../../modules/user/entities/user.model';
import { Permission } from '../../modules/role_permission/entities/permission.model';
import { RolePermission } from '../../modules/role_permission/entities/rolePermission.model';
import { Sequelize } from 'sequelize-typescript';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        query: { raw: true },
        logging: false,
      });

      sequelize.addModels([User, Role, Permission, RolePermission]);
      // sequelize.addModels([__dirname + './../../**/**/**.model{.ts,.js}']);

      // Role.addHook('beforeDestroy', (role, options) => {
      //   // console.log(role);
      // });

      await sequelize.sync();
      return sequelize;
    },
  },
];
