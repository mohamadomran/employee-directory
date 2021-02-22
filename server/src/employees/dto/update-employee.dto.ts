import { IsNotEmpty, IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UpdateEmployeeDto {
  @PrimaryGeneratedColumn()
  readonly id: string;

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
}
