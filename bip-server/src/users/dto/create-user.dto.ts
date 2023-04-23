import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Must be a string" })
  readonly email: string;
  @IsString({ message: "Must be a string" })
  readonly password: string;
  @IsString({ message: "Must be a string" })
  readonly firstName: string;
  @IsString({ message: "Must be a string" })
  readonly lastName: string;
  @IsString({ message: "Must be a string" })
  readonly surname: string;
}
