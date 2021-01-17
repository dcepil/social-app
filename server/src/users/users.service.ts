import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userData: UserDto): Promise<any> {
    const createdUser = new this.userModel(userData);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(handle: string): Promise<User> {
    return await this.userModel.findOne({ handle }).exec();
  }

  async update(handle: string, userData: UserDto) {
    //return `This action updates a #${id} user`;
  }

  async remove(handle: string) {
    //return `This action removes a #${id} user`;
  }
}
