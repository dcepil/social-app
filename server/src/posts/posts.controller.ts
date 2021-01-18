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
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CheckUserIsAuthor } from '../core/guards/user-is-author.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard, CheckUserIsAuthor)
  @Post()
  async create(@Body() postData: PostDto, @Request() req) {
    return await this.postsService.create(postData, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUserId(@Request() req: Request) {
    return await this.postsService.findAllByUserId(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
