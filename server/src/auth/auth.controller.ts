import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  Req,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Response,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-user.interface';
import { UsersService } from '../users/users.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { User } from '../users/schemas/user.schema';
import { request, Response as ExpressResponse } from 'express';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('csrf')
  async getCSRFToken(@Request() request): Promise<string> {
    return await this.authService.getCSRFToken(request);
  }

  @Post('signup')
  async signUp(@Body() userData: CreateUserDto): Promise<any> {
    return await this.authService.signUp(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    const accessCookie = await this.authService.login(user.handle);
    const {
      cookie: refreshCookie,
      token: newRefreshToken,
    } = await this.authService.refreshToken(user.handle);
    await this.usersService.setRefreshToken(newRefreshToken, user.handle);
    request.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    const { refreshToken, ...result } = user;
    return result;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser): Promise<User> {
    const accessCookie = await this.authService.login(request.user.handle);
    request.res.setHeader('Set-Cookie', accessCookie);
    const { password, refreshToken, ...result } = request.user['_doc'];
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.handle);
    request.res.setHeader('Set-Cookie', await this.authService.logout());
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: RequestWithUser) {
    const { password, refreshToken, ...result } = request.user['_doc'];
    return result;
  }
}
