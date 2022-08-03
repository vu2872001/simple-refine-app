import {
  Table,
  Model,
  Column,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.model';
import { Permission } from './permission.model';
import { RolePermission } from './rolePermission.model';

@Table({ timestamps: true, paranoid: true })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ unique: true })
  public role: string;

  @Column({ unique: true })
  public normalizeName: string;

  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => Permission, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    through: () => RolePermission,
  })
  permissions: Permission[];
}
