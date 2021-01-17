import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) throw new NotFoundException('No users.');
    const pwdlessUsers = [];
    users.forEach((user) => {
      const { password, ...result } = user['_doc'];
      pwdlessUsers.push(result);
    });
    return pwdlessUsers;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':handle')
  async findOne(@Param('handle') handle: string) {
    const user = await this.usersService.findOne(handle);
    if (!user) throw new NotFoundException("User doesn't exist.");
    const { password, ...result } = user['_doc'];
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':handle')
  async update(@Param('handle') handle: string, @Body() userData: UserDto) {
    return await this.usersService.update(handle, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':handle')
  async remove(@Param('handle') handle: string) {
    return await this.usersService.remove(handle);
  }
}
