import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.model';
import { Permission } from './permission.model';

@Table({ timestamps: true, paranoid: true })
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
