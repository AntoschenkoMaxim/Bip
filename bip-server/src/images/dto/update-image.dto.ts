import { IsString } from "class-validator";

export class UpdateImageDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
