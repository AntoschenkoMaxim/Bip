import { IsString } from "class-validator";

export class CreateStatementDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
