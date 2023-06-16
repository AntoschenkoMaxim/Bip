import { IsString } from "class-validator";

export class UpdatePriceDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
