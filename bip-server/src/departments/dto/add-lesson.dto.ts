import { IsNumber } from "class-validator";

export class AddLessonDto {
  @IsNumber({}, { message: "Must be a number" })
  readonly lessonId: number;

  @IsNumber({}, { message: "Must be a number" })
  readonly departmentId: number;
}
