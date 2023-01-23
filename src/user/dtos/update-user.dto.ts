import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    @IsEmail()
    email: string;
  }