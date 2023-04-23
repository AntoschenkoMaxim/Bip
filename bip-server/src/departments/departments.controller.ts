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
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { AddLessonDto } from "./dto/add-lesson.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("departments")
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.updateDepartmentById(id, updateDepartmentDto);
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.departmentService.removeDepartmentById(id);
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post("/lesson")
  add(@Body() addLessonDto: AddLessonDto) {
    return this.departmentService.addLesson(addLessonDto);
  }
}
