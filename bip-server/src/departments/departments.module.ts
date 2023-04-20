import { Module } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./departments.model";
import { Lesson } from "src/lessons/lessons.model";
import { DepartmentLessons } from "./department-lessons.model";
import { LessonsModule } from "src/lessons/lessons.module";

@Module({
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  imports: [
    SequelizeModule.forFeature([Department, Lesson, DepartmentLessons]),
    LessonsModule,
  ],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
