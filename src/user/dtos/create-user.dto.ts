import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { defaultIfEmpty } from "rxjs";

export class CreateUserDTO {
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(4)
    password: string;
    @IsNotEmpty()//to do : check if valid role
    roles: string[];
  }