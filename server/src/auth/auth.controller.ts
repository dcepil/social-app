import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CheckUserExists } from 'src/core/guards/user-exists.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(CheckUserExists)
  @Post('signup')
  async signUp(@Body() userData: UserDto) {
    return await this.authService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
