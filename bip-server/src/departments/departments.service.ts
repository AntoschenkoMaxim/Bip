import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./departments.model";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { AddLessonDto } from "./dto/add-lesson.dto";
import { LessonsService } from "src/lessons/lessons.service";
import { UpdateDepartmentDto } from "./dto/update-department.dto";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentRepository: typeof Department,
    private lessonService: LessonsService
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const existedDepartment = await this.getDepartmentByValue(
      createDepartmentDto.value
    );
    if (existedDepartment) {
      throw new HttpException(
        "Department with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    const lesson = await this.departmentRepository.create(createDepartmentDto);
    return lesson;
  }

  async getAllDepartments() {
    const departments = await this.departmentRepository.findAndCountAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
    return departments;
  }

  async getDepartmentByValue(value: string) {
    const department = await this.departmentRepository.findOne({
      where: { value },
    });
    return department;
  }

  async getDepartmentById(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    return department;
  }

  async updateDepartmentById(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto
  ) {
    const existedDepartment = await this.getDepartmentByValue(
      updateDepartmentDto.value
    );
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) {
      throw new HttpException("Department not found!", HttpStatus.NOT_FOUND);
    }
    if (existedDepartment) {
      throw new HttpException(
        "Department with this value already exists!",
        HttpStatus.NOT_FOUND
      );
    }
    await this.departmentRepository.update(updateDepartmentDto, {
      where: { id },
    });
  }

  async removeDepartmentById(id: number) {
    const department = await this.getDepartmentById(id);
    if (!department) {
      throw new HttpException("Department not found!", HttpStatus.NOT_FOUND);
    }
    await this.departmentRepository.destroy({ where: { id } });
  }

  async addLesson(addLessonDto: AddLessonDto) {
    const department = await this.departmentRepository.findByPk(
      addLessonDto.departmentId
    );
    const lesson = await this.lessonService.getLessonByValue(
      addLessonDto.value
    );
    if (department && lesson) {
      await department.$add("lesson", lesson.id);
      return addLessonDto;
    }
    throw new HttpException(
      "Department or lesson not found!",
      HttpStatus.NOT_FOUND
    );
  }
}
