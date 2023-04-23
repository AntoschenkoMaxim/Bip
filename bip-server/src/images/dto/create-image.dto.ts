import { IsString } from "class-validator";

export class CreateImageDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
