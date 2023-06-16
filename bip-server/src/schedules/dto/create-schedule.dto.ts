import { IsString } from "class-validator";

export class CreateScheduleDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
