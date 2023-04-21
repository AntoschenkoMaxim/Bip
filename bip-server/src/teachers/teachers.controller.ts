import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Controller("teachers")
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  getAll() {
    return this.teacherService.getAllTeachers();
  }

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
