import { Module, forwardRef } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./departments.model";
import { Lesson } from "src/lessons/lessons.model";
import { DepartmentLessons } from "./department-lessons.model";
import { LessonsModule } from "src/lessons/lessons.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  imports: [
    SequelizeModule.forFeature([Department, Lesson, DepartmentLessons]),
    LessonsModule,
    AuthModule,
  ],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
