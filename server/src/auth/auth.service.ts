import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(handle: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findOne(handle);
    if (!user) return null;
    const match = await this.validatePassword(plainPassword, user.password);
    if (!match) return null;
    const { password, ...result } = user['_doc'];
    return result;
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  }

  async login(user: any): Promise<any> {
    const token = await this.generateToken(user);
    return { user, token };
  }

  async generateToken(user: any): Promise<string> {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  async create(user: any): Promise<any> {
    try {
      const hashedPassword = await this.hashPassword(user.password);
      const createUser = await this.usersService.create({
        ...user,
        password: hashedPassword,
      });
      const { password, ...result } = createUser['_doc'];
      const token = await this.generateToken(result);
      return { user: result, token };
    } catch {
      throw new HttpException('Bad user data', HttpStatus.BAD_REQUEST);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
