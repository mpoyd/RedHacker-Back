import { IsOptional, IsString, isString } from "class-validator";

export class FilterLabDTO {
    @IsOptional()
    @IsString()
    search: string;
    @IsOptional()
    @IsString()
    category: string;
  }