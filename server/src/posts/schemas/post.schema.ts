import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true })
  body: string;

  @Prop()
  media: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: false })
  isRepost: boolean;

  @Prop({ required: true, default: 24, min: 8, max: 72 })
  postTimeout: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
