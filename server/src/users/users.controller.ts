import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './schemas/user.schema';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) throw new NotFoundException('No users.');
    const pwdlessUsers = [];
    users.forEach((user) => {
      const { password, refreshToken, email, ...result } = user['_doc'];
      pwdlessUsers.push(result);
    });
    return pwdlessUsers;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':handle')
  async findOne(@Param('handle') handle: string): Promise<User> {
    const user = await this.usersService.findOneByHandle(handle);
    const { password, refreshToken, ...result } = user['_doc'];
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':handle')
  async update(
    @Param('handle') handle: string,
    @Body() userData: CreateUserDto,
  ) {
    return await this.usersService.update(handle, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':handle')
  async remove(@Param('handle') handle: string) {
    return await this.usersService.remove(handle);
  }
}
