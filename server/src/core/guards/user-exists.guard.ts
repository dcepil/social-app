import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CheckUserExists implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExistsByHandle = await this.userService.findOne(
      request.body.handle,
    );
    const userExistsByEmail = await this.userService.findOne(request.body.email);
    if (userExistsByHandle || userExistsByEmail) {
      throw new ForbiddenException(
        'A user with this handle/email already exists.',
      );
    }
    return true;
  }
}
