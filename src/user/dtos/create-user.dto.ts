import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { defaultIfEmpty } from "rxjs";

export class CreateUserDTO {
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(4)
    password: string;
    @IsOptional()
    roles: string[];
  }