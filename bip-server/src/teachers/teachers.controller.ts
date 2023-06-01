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
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("teachers")
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  getAll() {
    return this.teacherService.getAllTeachers();
  }

  @Get(":id")
  getById(@Param("id") id: number) {
    return this.teacherService.getTeacherById(id);
  }

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.updateTeacherById(id, updateTeacherDto);
  }

  // @Roles("moderator", "admin")
  // @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.teacherService.removeTeacherById(id);
  }
}
