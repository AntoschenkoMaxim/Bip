import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("teachers")
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  getAll() {
    return this.teacherService.getAllTeachers();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.updateTeacherById(id, updateTeacherDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.teacherService.removeTeacherById(id);
  }
}
