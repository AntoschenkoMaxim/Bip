import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Controller("lessons")
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  getAll() {
    return this.lessonService.getAllLessons();
  }

  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonService.updateLessonById(id, updateLessonDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.lessonService.deleteLessonById(id);
  }
}
