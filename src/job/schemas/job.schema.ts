import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
  labId: string;

  @Prop()
  userId: string;

  @Prop({default:"in progress"})
  state: string;
  
  @Prop()
  startedAt: Date;

}

export const JobSchema = SchemaFactory.createForClass(Job);