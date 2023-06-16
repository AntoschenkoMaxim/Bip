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
import { SchedulesService } from "./schedules.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Controller("schedules")
export class SchedulesController {
  constructor(private scheduleService: SchedulesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @UploadedFile() image: any
  ) {
    return this.scheduleService.createSchedule(createScheduleDto, image);
  }

  @Get()
  getAll() {
    return this.scheduleService.getAllSchedules();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @UploadedFile() image: any
  ) {
    return this.scheduleService.updateScheduleById(
      id,
      updateScheduleDto,
      image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.scheduleService.removeScheduleById(id);
  }
}
