import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpgradeUserDTO } from './dtos/upgrade-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.save();
    return this.userModel.findOne({username: newUser.username});
  }

  async findUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({username: username}).select('+password').exec();//select password too
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const labs = await this.userModel.find().exec();
    return labs;
  }

  async getUser(id: string): Promise<User> {
    const lab = await this.userModel.findById(id).exec();
    return lab;
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    return deletedUser;
  }

  async upgradeUser(id:string): Promise<User> {
    const upgradedUser = await this.userModel.findByIdAndUpdate(id, {"roles":["premium_user"]}, { new: true });
    return upgradedUser;
  }
}