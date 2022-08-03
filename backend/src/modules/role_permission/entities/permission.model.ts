import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { RolePermission } from './rolePermission.model';

@Table({ timestamps: true, paranoid: true })
export class Permission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ unique: true })
  public permission: string;

  @Column
  public info: string;

  @BelongsToMany(() => Role, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    through: () => RolePermission,
  })
  roles: Role[];
}
