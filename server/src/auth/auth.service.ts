import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getCSRFToken(request: any): Promise<string> {
    return JSON.stringify({ csrfToken: request.csrfToken() });
  }

  async validateUser(handle: string, plainPassword: string): Promise<User> {
    try {
      const user = await this.usersService.findOneByHandle(handle);
      await this.validatePassword(plainPassword, user.password);
      const { password, ...result } = user['_doc'];
      return result;
    } catch {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (!match)
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    return match;
  }

  async login(handle: string): Promise<string> {
    const payload: TokenPayload = { userHandle: handle };
    const token = await this.jwtService.signAsync(payload);
    return `Authentication=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async refreshToken(
    handle: string,
  ): Promise<{ cookie: string; token: string }> {
    const payload: TokenPayload = { userHandle: handle };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION_TIME')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${this.configService.get(
      'JWT_REFRESH_EXPIRATION_TIME',
    )}`;
    return { cookie, token };
  }

  async logout(): Promise<string[]> {
    return [
      'Authentication=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0',
    ];
  }

  async generateToken(user: User): Promise<string> {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  async signUp(signupData: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await this.hashPassword(signupData.password);
      const createUser = await this.usersService.create({
        ...signupData,
        password: hashedPassword,
      });
      const { password, ...result } = createUser['_doc'];
      await this.generateToken(result);
      return result;
    } catch {
      throw new HttpException('Bad user data', HttpStatus.BAD_REQUEST);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
