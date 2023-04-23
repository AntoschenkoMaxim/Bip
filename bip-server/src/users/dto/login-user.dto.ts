import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Must be in email format" })
  readonly email: string;
  @IsString({ message: "Must be a string" })
  readonly password: string;
}
