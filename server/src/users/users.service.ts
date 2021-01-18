import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneByHandle(handle: string): Promise<User> {
    const user = await this.userModel.findOne({ handle }).exec();
    if (user) return user;
    throw new HttpException(
      'User with given handle does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async setRefreshToken(refreshToken: string, handle: string): Promise<User> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return await this.userModel
      .updateOne({ handle }, { refreshToken: hashedRefreshToken })
      .exec();
  }

  async removeRefreshToken(handle: string): Promise<User> {
    return this.userModel.updateOne({ handle }, { refreshToken: null }).exec();
  }

  async checkRefreshToken(refreshToken: string, handle: string): Promise<User> {
    const user = await this.findOneByHandle(handle);
    const refreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (refreshTokenMatch) return user;
  }

  async update(handle: string, userData: CreateUserDto) {
    //return `This action updates a #${id} user`;
  }

  async remove(handle: string) {
    //return `This action removes a #${id} user`;
  }
}
