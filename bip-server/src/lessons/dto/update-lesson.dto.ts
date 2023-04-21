import { IsNumber, IsString } from "class-validator";

export class UpdateLessonDto {
  @IsString({ message: "Must be a string" })
  readonly value: string;
  @IsString({ message: "Must be a string" })
  readonly description: string;
  @IsNumber({}, { message: "Must be a number" })
  readonly teacherId: number;
}
