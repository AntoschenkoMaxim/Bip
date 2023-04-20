import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { AddLessonDto } from "./dto/add-lesson.dto";

@Controller("departments")
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
  }

  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.updateDepartmentById(id, updateDepartmentDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.departmentService.removeDepartmentById(id);
  }

  @Post("/lesson")
  add(@Body() addLessonDto: AddLessonDto) {
    return this.departmentService.addLesson(addLessonDto);
  }
}
