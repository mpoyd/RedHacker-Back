import { Controller, Request, Get, Post, Body, UseGuards, Put, Param, NotFoundException, Delete, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpgradeUserDTO } from './dtos/upgrade-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.userService.getUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.free_user,Role.admin)
  @Put('/upgrade/:id')
  upgradeUser(@Param('id') id: string,@Body() upgradeUserDTO: UpgradeUserDTO){
    //check verification code
    return this.userService.upgradeUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get('/')
  async getUsers() {
    const allUsers = await this.userService.getAllUsers();
    return allUsers;
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const User = await this.userService.getUser(id);
    if (!User) throw new NotFoundException('User does not exist!');
    return User;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(@Request() req, @Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    if(!((req.user.roles.includes("admin"))||(req.user.userId === id))) throw new ForbiddenException("You can only modify your own profile");
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const User = await this.userService.deleteUser(id);
    if (!User) throw new NotFoundException('User does not exist');
    return User;
  }
  
  

  
}