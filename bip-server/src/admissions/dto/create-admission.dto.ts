import { IsString } from "class-validator";

export class CreateAdmissionDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
  @IsString({ message: "Must be a string" })
  readonly description: string;
}
