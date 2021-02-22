import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public title: string;

  @Column()
  public department: string;

  @Column()
  public location: string;

  @Column()
  public email: string;

  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;
}
