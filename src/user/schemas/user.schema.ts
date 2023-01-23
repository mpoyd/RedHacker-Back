import { DefaultValuePipe } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  
  @Prop({select: false} )//don't select password by default
  password: string;

  @Prop({default:["free_user"]})
  roles: Role[];

}

export const UserSchema = SchemaFactory.createForClass(User);