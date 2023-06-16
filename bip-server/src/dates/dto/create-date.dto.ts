import { IsString } from "class-validator";

export class CreateDateDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
