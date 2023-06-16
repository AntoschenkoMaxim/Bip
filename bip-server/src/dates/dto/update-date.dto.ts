import { IsString } from "class-validator";

export class UpdateDateDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
