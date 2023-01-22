import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import mongoose module
import { LabSchema } from './schemas/lab.schema'; // 2. Import Lab schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'lab', schema: LabSchema }]) // 3. Setup the mongoose module to use the lab schema
  ],
  controllers: [LabController],
  providers: [LabService]
})
export class LabModule {}