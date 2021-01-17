import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Date } from 'mongoose';

export class UserDto {
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
  
  readonly avatar: string;

  @IsNotEmpty()
  readonly birthdate: Date;

  readonly postTimeout: number;
  readonly following: string[];
  readonly followed: string[];
}
