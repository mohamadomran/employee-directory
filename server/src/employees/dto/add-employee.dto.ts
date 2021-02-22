import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AddEmployeeDto {
  @IsNotEmpty()
  public readonly firstname: string;

  @IsNotEmpty()
  public readonly lastname: string;

  @IsNotEmpty()
  public readonly title: string;

  @IsNotEmpty()
  public readonly department: string;

  @IsNotEmpty()
  public readonly location: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;
}
