import { IsString } from "class-validator";

export class CreatePostsCategoryDto {
  @IsString({ message: "Must be a string" })
  readonly value: string;
  @IsString({ message: "Must be a string" })
  readonly description: string;
}
