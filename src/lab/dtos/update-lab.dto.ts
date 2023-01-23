import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLabDTO {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsNumber()
    price: number;
    @IsOptional()
    @IsString()
    category: string;
  }