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
import { TimetablesService } from "./timetables.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateTimetableDto } from "./dto/create-timetable.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { UpdateTimetableDto } from "./dto/update-timetable.dto";

@Controller("timetables")
export class TimetablesController {
  constructor(private timetableService: TimetablesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createTimetableDto: CreateTimetableDto,
    @UploadedFile() image: any
  ) {
    return this.timetableService.createTimetable(createTimetableDto, image);
  }

  @Get()
  getAll() {
    return this.timetableService.getAllTimetables();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updateTimetableDto: UpdateTimetableDto,
    @UploadedFile() image: any
  ) {
    return this.timetableService.updateTimetableById(
      id,
      updateTimetableDto,
      image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.timetableService.removeTimetableById(id);
  }
}
