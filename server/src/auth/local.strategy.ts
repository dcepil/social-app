import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField: 'handle'
    });
  }

  async validate(handle: string, password: string): Promise<User> {
      const user = await this.authService.validateUser(handle, password);
      if(!user) throw new UnauthorizedException();
      return user;
  }
}
