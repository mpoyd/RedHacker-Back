import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lab, LabDocument } from './schemas/lab.schema';
import { CreateLabDTO } from './dtos/create-lab.dto';
import { FilterLabDTO } from './dtos/filter-lab.dto';

@Injectable()
export class LabService {
  constructor(@InjectModel('lab') private readonly labModel: Model<LabDocument>) { }

  async getFilteredLabs(filterLabDTO: FilterLabDTO): Promise<Lab[]> {
    const { category, search } = filterLabDTO;
    let labs = await this.getAllLabs();

    if (search) {
      labs = labs.filter(lab => 
        lab.name.includes(search) ||
        lab.description.includes(search)
      );
    }

    if (category) {
      labs = labs.filter(Lab => Lab.category === category)
    }

    return labs;
  }

  async getAllLabs(): Promise<Lab[]> {
    const labs = await this.labModel.find().exec();
    return labs;
  }

  async getLab(id: string): Promise<Lab> {
    const lab = await this.labModel.findById(id).exec();
    return lab;
  }

  async addLab(createLabDTO: CreateLabDTO): Promise<Lab> {
    const newLab = await this.labModel.create(createLabDTO);
    return newLab.save();
  }

  async updateLab(id: string, createLabDTO: CreateLabDTO): Promise<Lab> {
    const updatedLab = await this.labModel
      .findByIdAndUpdate(id, createLabDTO, { new: true });
    return updatedLab;
  }

  async deleteLab(id: string): Promise<any> {
    const deletedLab = await this.labModel.findByIdAndRemove(id);
    return deletedLab;
  }
}