import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpgradeUserDTO {
    @IsString()
    id: string;
    @IsString()
    verificationCode: string;
  }