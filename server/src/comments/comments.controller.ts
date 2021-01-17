import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CheckPostExists } from '../core/guards/post-exists.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckUserIsAuthor } from '../core/guards/user-is-author.guard';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard, CheckUserIsAuthor, CheckPostExists)
  @Post()
  async create(@Body() commentData: CommentDto) {
    return await this.commentsService.create(commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByPostId(@Request() req: Request) {
    return await this.commentsService.findAllByPostId(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
