import { IsString } from "class-validator";

export class UpdateStatementDto {
  @IsString({ message: "Must be a string" })
  readonly title: string;
}
