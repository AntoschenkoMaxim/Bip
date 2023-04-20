// import { IsNumberString, IsString } from "class-validator";

export class AddLessonDto {
  // @IsString({ message: "Must be a string" })
  readonly value: string;

  // @IsNumberString({}, { message: "Must be a number" })
  readonly departmentId: number;
}
