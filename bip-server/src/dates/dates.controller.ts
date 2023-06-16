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
import { DatesService } from "./dates.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDateDto } from "./dto/create-date.dto";
import { UpdateDateDto } from "./dto/update-date.dto";

@Controller("dates")
export class DatesController {
  constructor(private dateService: DatesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createDateDto: CreateDateDto, @UploadedFile() image: any) {
    return this.dateService.createDate(createDateDto, image);
  }

  @Get()
  getAll() {
    return this.dateService.getAllDates();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateDateById(
    @Param("id") id: number,
    @Body() updateDateDto: UpdateDateDto,
    @UploadedFile() image: any
  ) {
    return this.dateService.updateDateById(id, updateDateDto, image);
  }

  @Delete(":id")
  removeDateById(@Param("id") id: number) {
    return this.dateService.removeDateById(id);
  }
}
