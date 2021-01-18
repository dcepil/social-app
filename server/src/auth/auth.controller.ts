import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/request-user.interface';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() userData: CreateUserDto) {
    return await this.authService.signUp(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessCookie = await this.authService.login(user.handle);
    const {
      cookie: refreshCookie,
      token: refreshToken,
    } = await this.authService.refreshToken(user.handle);
    await this.usersService.setRefreshToken(refreshToken, user.handle);
    request.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const accessCookie = await this.authService.login(request.user.handle);
    request.res.setHeader('Set-Cookie', accessCookie);
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.handle);
    request.res.setHeader('Set-Cookie', await this.authService.logout());
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: RequestWithUser) {
    const { password, ...result } = request.user['_doc'];
    return result;
  }
}
