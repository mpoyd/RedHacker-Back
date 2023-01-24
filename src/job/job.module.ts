import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }])
  ],
  providers: [JobService],
  exports: [JobService],
  controllers: [JobController],
})
export class JobModule {}