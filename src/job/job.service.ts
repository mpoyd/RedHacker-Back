import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDTO } from './dtos/create-job.dto';
import { identity } from 'rxjs';


@Injectable()
export class JobService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<JobDocument>) { }

  async addJob(createJobDTO: CreateJobDTO): Promise<Job> {
    const newJob = await this.jobModel.create(createJobDTO);
    newJob.startedAt = new Date(Date.now());
    newJob.save();
    //A7ki m3a ayadi ********************add job**************************
    console.log("start timeout"+newJob._id);
    const myTimeout = setTimeout(this.deleteAfterTimer.bind(this), 1000*15,newJob._id);// Stop job after 10 seconds
    console.log("set timeout");
    return newJob;
  }

  async deleteAfterTimer(arg): Promise<any> {
    const deletedJob = await this.deleteJob(arg);
    return deletedJob;
  }

  async getAllJobs(): Promise<Job[]> {
    const labs = await this.jobModel.find().exec();
    return labs;
  }

  async getJob(id: string): Promise<Job> {
    const lab = await this.jobModel.findById(id).exec();
    return lab;
  }

  async checkJob(id: string): Promise<boolean> {
    //A7ki m3a ayadi ********************check job**************************
    const answer = true;
    return answer;
  }

  async deleteJob(id: string): Promise<any> {
    //A7ki m3a ayadi ********************delete job**************************
    console.log("delete");
    const deletedJob = await this.jobModel.findByIdAndRemove(id);
    return deletedJob;
  }
  
}