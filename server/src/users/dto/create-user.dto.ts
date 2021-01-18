import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Date } from 'mongoose';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly handle: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;

  @IsNotEmpty()
  readonly birthdate: Date;

  @IsNumber()
  @IsOptional()
  readonly postTimeout: number;

  @IsString({ each: true })
  @IsOptional()
  readonly following: string[];

  @IsString({ each: true })
  @IsOptional()
  readonly followed: string[];
}
