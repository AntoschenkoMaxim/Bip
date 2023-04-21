import { Module } from "@nestjs/common";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teacher } from "./teachers.model";
import { Lesson } from "src/lessons/lessons.model";

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [SequelizeModule.forFeature([Teacher, Lesson])],
})
export class TeachersModule {}
