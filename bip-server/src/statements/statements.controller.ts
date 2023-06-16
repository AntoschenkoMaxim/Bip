import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { StatementsService } from "./statements.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateStatementDto } from "./dto/create-statement.dto";
import { UpdateStatementDto } from "./dto/update-statement.dto";

@Controller("statements")
export class StatementsController {
  constructor(private statementService: StatementsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createStatementDto: CreateStatementDto,
    @UploadedFile() image: any
  ) {
    return this.statementService.createStatement(createStatementDto, image);
  }

  @Get()
  getAll() {
    return this.statementService.getAllStatements();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updateStatementDto: UpdateStatementDto,
    @UploadedFile() image: any
  ) {
    return this.statementService.updateStatementById(
      id,
      updateStatementDto,
      image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.statementService.removeStatementById(id);
  }
}
