/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  [x: string]: any;
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({select:false})
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
