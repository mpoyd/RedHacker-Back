import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LabDocument = Lab & Document;

@Schema()
export class Lab {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;
}

export const LabSchema = SchemaFactory.createForClass(Lab);