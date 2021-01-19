import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  handle: string;

  @Prop()
  avatar: string;

  @Prop({ type: Date, required: true })
  birthdate: Date;

  @Prop({ required: true, default: 24, min: 8, max: 72 })
  postTimeout: number;

  @Prop([String])
  following: string[];

  @Prop([String])
  followed: string[];

  @Exclude()
  @Prop({ type: String })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
