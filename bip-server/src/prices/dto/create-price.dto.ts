import { IsString } from "class-validator";

export class CreatePriceDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
