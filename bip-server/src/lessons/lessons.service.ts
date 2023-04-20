import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Lesson } from "./lessons.model";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Injectable()
export class LessonsService {
  constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const existedLesson = await this.getLessonByValue(createLessonDto.value);
    if (existedLesson) {
      throw new HttpException(
        "Lesson with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    const lesson = await this.lessonRepository.create(createLessonDto);
    return lesson;
  }

  async getAllLessons() {
    const lessons = await this.lessonRepository.findAndCountAll();
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
    if (!lesson) {
      throw new HttpException("Lesson not found!", HttpStatus.NOT_FOUND);
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
