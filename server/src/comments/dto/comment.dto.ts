import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../users/schemas/user.schema';
import { Post } from '../../posts/schemas/post.schema';

export class CommentDto {
  @IsNotEmpty()
  readonly parent: Post;

  @IsNotEmpty()
  readonly author: User;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  readonly media: string;
  readonly likes: number;
  readonly replies: Record<string, any>;
}
