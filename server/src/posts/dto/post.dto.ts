import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../users/schemas/user.schema';

export class PostDto {
  @IsNotEmpty()
  readonly author: User;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  readonly media: string;
  readonly likes: number;
  readonly isRepost: boolean;
  readonly postTimeout: number;
}
