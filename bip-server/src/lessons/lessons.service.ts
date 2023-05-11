import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Lesson } from "./lessons.model";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TeachersService } from "src/teachers/teachers.service";

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson) private lessonRepository: typeof Lesson,
    private teacherService: TeachersService
  ) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const existedLesson = await this.getLessonByValue(createLessonDto.value);
    const teacher = await this.teacherService.getTeacherById(
      createLessonDto.teacherId
    );
    if (existedLesson) {
      throw new HttpException(
        "Lesson with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!teacher) {
      throw new HttpException(
        "There is no teacher with this teacherId!",
        HttpStatus.BAD_REQUEST
      );
    }
    const lesson = await this.lessonRepository.create(createLessonDto);
    return lesson;
  }

  async getAllLessons() {
    const lessons = await this.lessonRepository.findAndCountAll({
      include: { all: true },
      order: [["id", "ASC"]],
      distinct: true
    });
    return lessons;
  }

  async getLessonByValue(value: string) {
    const lesson = await this.lessonRepository.findOne({ where: { value } });
    return lesson;
  }

  async getLessonById(id: number) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    return lesson;
  }

  async updateLessonById(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.getLessonById(id);
    const teacher = await this.teacherService.getTeacherById(
      updateLessonDto.teacherId
    );
    if (!lesson) {
      throw new HttpException("Lesson not found!", HttpStatus.NOT_FOUND);
    }
    if (!teacher) {
      throw new HttpException(
        "There is no teacher with this teacherId!",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.lessonRepository.update(updateLessonDto, { where: { id } });
  }

  async deleteLessonById(id: number) {
    const lesson = await this.getLessonById(id);
    if (!lesson) {
      throw new HttpException("Lesson not found!", HttpStatus.NOT_FOUND);
    }
    await this.lessonRepository.destroy({ where: { id } });
  }
}
