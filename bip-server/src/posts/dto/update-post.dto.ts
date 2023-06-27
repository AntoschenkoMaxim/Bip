import { IsString, IsISO8601 } from "class-validator";

export class UpdatePostDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
  @IsString({ message: "Must be a string" })
  readonly description: string;
  @IsISO8601({}, { message: "Must be a date format" })
  readonly date: Date;
}
