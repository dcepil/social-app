import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './dto/post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(postData: PostDto, user: any): Promise<Post> {
    const postTimeout = new Date();
    postTimeout.setHours(postTimeout.getHours() + user.postTimeout);
    try {
      const newPost = new this.postModel({
        postTimeout: postTimeout,
        ...postData,
      });
      return await newPost.save();
    } catch {
      throw new HttpException('Bad post data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByUserId(request): Promise<Post[]> {
    try {
      return await this.postModel.find({ author: request.body.userId }).exec();
    } catch {
      throw new HttpException(
        'User does not exist or does not have posts',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.postModel.findById(id).exec();
    } catch {
      throw new HttpException('Post resource not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
