import { IsISO8601 } from "class-validator";

export class UpdateTimetableDto {
  @IsISO8601({}, { message: "Must be a date format" })
  readonly date: Date;
}
