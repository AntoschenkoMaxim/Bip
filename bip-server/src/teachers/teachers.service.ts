import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Teacher } from "./teachers.model";
import { LessonsService } from "src/lessons/lessons.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.teacherRepository.create(createTeacherDto);
    return teacher;
  }

  async getAllTeachers() {
    const teachers = await this.teacherRepository.findAndCountAll({
      include: { all: true },
      order: [["id", "ASC"]],
      distinct: true,
    });
    return teachers;
  }

  async getTeacherById(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!teacher) {
      throw new HttpException("Teacher not found!", HttpStatus.NOT_FOUND);
    }
    return teacher;
  }

  async updateTeacherById(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.getTeacherById(id);
    await this.teacherRepository.update(updateTeacherDto, { where: { id } });
  }

  async removeTeacherById(id: number) {
    await this.getTeacherById(id);
    await this.teacherRepository.destroy({ where: { id } });
  }
}
