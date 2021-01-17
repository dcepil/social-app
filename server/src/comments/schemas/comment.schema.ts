import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Post } from '../../posts/schemas/post.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  parent: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop()
  body: string;

  @Prop()
  media: string;

  @Prop()
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
