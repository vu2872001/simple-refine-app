import {
  Model,
  Table,
  Column,
  AllowNull,
  BelongsTo,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Role } from '../../role_permission/entities/role.model';

@Table({ timestamps: true, paranoid: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column
  public name: string;

  @Column
  public username: string;

  @Column({ defaultValue: 18 })
  public age: number;

  @Column
  public password: string;

  @AllowNull
  @Column
  public currentHashedRefreshToken?: string;

  @Column({ defaultValue: true })
  public isActivate: boolean;

  @ForeignKey(() => Role)
  @Column
  roleId: number;
  @BelongsTo(() => Role)
  public role: Role;
}
