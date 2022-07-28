import {
  Column,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../../common/constants/role.constant';
import UserPermission from '../../auth/types/permission.type';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public username: string;

  @Column({ default: 18 })
  public age: number;

  @Column()
  public password: string;

  @Column({
    nullable: true,
  })
  public currentHashedRefreshToken?: string;

  @Column('boolean', { default: true })
  public isActivate: boolean;

  @DeleteDateColumn()
  public deletedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @Column('simple-array')
  public permissions: UserPermission[];
}
