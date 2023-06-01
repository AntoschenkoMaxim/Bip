import { IsString } from "class-validator";

export class UpdateTeacherDto {
  @IsString({ message: "Must be a string" })
  readonly firstName: string;
  @IsString({ message: "Must be a string" })
  readonly lastName: string;
  @IsString({ message: "Must be a string" })
  readonly surname: string;
  @IsString({ message: "Must be a string" })
  readonly role: string;
  @IsString({ message: "Must be a string" })
  readonly phone: string;
  @IsString({ message: "Must be a string" })
  readonly email: string;
  @IsString({ message: "Must be a string" })
  readonly telegram: string;
}
