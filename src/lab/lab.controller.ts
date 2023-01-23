import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { LabService } from './lab.service';
import { CreateLabDTO } from './dtos/create-lab.dto';
import { FilterLabDTO } from './dtos/filter-lab.dto';
import { UpdateLabDTO } from './dtos/update-lab.dto';

@Controller('lab')
export class LabController {
  constructor(private labService: LabService) { }

  @Get('/')
  async getLabs(@Query() filterLabDTO: FilterLabDTO) {
    if (Object.keys(filterLabDTO).length) {
      const filteredLabs = await this.labService.getFilteredLabs(filterLabDTO);
      return filteredLabs;
    } else {
      const allLabs = await this.labService.getAllLabs();
      return allLabs;
    }
  }

  @Get('/:id')
  async getLab(@Param('id') id: string) {
    const lab = await this.labService.getLab(id);
    if (!lab) throw new NotFoundException('Lab does not exist!');
    return lab;
  }

  @Post('/')
  async addLab(@Body() createLabDTO: CreateLabDTO) {
    const lab = await this.labService.addLab(createLabDTO);
    return lab;
  }

  @Put('/:id')
  async updateLab(@Param('id') id: string, @Body() updateLabDTO: UpdateLabDTO) {
    const lab = await this.labService.updateLab(id, updateLabDTO);
    if (!lab) throw new NotFoundException('Lab does not exist!');
    return lab;
  }

  @Delete('/:id')
  async deleteLab(@Param('id') id: string) {
    const lab = await this.labService.deleteLab(id);
    if (!lab) throw new NotFoundException('Lab does not exist');
    return lab;
  }
}