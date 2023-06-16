import { IsString } from "class-validator";

export class UpdateScheduleDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
