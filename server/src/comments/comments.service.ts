import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from '../posts/posts.service';
import { CommentDto } from './dto/comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(commentData: CommentDto): Promise<Comment> {
    try {
      const createComment = new this.commentModel(commentData);
      return await createComment.save();
    } catch (error) {
      console.error(error);
      throw new HttpException('Bad comment data', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByPostId(request): Promise<Comment[]> {
    try {
      return await this.commentModel.find({ parent: request.body.postId }).exec();
    } catch {
      throw new HttpException(
        'Post does not exist or does not have comments',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
