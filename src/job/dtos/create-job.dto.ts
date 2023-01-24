import { IsString } from "class-validator";


export class CreateJobDTO {

  @IsString()
  labId: string;
  @IsString()
  userId: string;
}