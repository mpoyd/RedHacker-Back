import { Controller, Request, Get, Post, Body, UseGuards, Put, Param, NotFoundException, Delete, ForbiddenException } from '@nestjs/common';
import { JobService } from 'src/job/job.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateJobDTO } from './dtos/create-job.dto';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('check/:id')
  async checkJob(@Param('id') id: string) {
    const job = await this.jobService.getJob(id);
    if (!job) throw new NotFoundException('Job does not exist!');
    const answer = await this.jobService.checkJob(id);//send request to ayadi
    return answer;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get('/')
  async getJobs() {
    const allJobs = await this.jobService.getAllJobs();
    return allJobs;
  }

  @Get('/:id')
  async getJob(@Param('id') id: string) {
    const Job = await this.jobService.getJob(id);
    if (!Job) throw new NotFoundException('Job does not exist!');
    return Job;
  }

  @Post('/')
  async addJob(@Body() createJobDTO: CreateJobDTO) {
    const job = await this.jobService.addJob(createJobDTO);
    return job;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Delete('/:id')
  async deleteJob(@Param('id') id: string) {
    const job = await this.jobService.deleteJob(id);
    if (!job) throw new NotFoundException('Job does not exist');
    return job;
  }
  
  

  
}