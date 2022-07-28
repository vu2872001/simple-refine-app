import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column()
  public info: string;

  @Column('boolean', { default: true })
  public isActivate: boolean;

  @DeleteDateColumn()
  public deletedAt: Date;
}
