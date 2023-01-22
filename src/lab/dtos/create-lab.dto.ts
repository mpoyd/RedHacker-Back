import { IsNumber, IsString } from "class-validator";

export class CreateLabDTO {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
    @IsString()
    category: string;
  }