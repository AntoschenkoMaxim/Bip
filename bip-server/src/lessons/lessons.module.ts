import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Lesson } from "./lessons.model";
import { Department } from "src/departments/departments.model";
import { DepartmentLessons } from "src/departments/department-lessons.model";
import { AuthModule } from "src/auth/auth.module";
import { TeachersModule } from "src/teachers/teachers.module";

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [
    SequelizeModule.forFeature([Lesson, Department, DepartmentLessons]),
    TeachersModule,
    AuthModule,
  ],
  exports: [LessonsService],
})
export class LessonsModule {}
