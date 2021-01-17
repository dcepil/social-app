import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from '../../posts/posts.service';

@Injectable()
export class CheckPostExists implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const postExists = await this.postsService.findOne(request.body.parent);
    if (!postExists) throw new NotFoundException("Parent post doesn't exist");
    return true;
  }
}
