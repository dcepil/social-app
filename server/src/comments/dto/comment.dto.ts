import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { User } from '../../users/schemas/user.schema';
import { Post } from '../../posts/schemas/post.schema';

export class CommentDto {
  @IsNotEmpty()
  readonly parent: Post;

  @IsNotEmpty()
  readonly author: User;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  readonly body: string;

  @IsString()
  @IsOptional()
  readonly media: string;

  @IsNumber()
  @IsOptional()
  readonly likes: number;
}
