import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";

@Controller("lessons")
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  getAll() {
    return this.lessonService.getAllLessons();
  }

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonService.updateLessonById(id, updateLessonDto);
  }

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.lessonService.deleteLessonById(id);
  }
}
