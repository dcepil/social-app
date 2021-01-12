import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
