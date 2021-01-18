import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { User } from '../../users/schemas/user.schema';

export class PostDto {
  @IsNotEmpty()
  readonly author: User;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsString()
  @IsOptional()
  readonly media: string;

  @IsNumber()
  @IsOptional()
  readonly likes: number;

  @IsBoolean()
  @IsOptional()
  readonly isRepost: boolean;

  @IsNumber()
  @IsOptional()
  readonly postTimeout: number;
}
