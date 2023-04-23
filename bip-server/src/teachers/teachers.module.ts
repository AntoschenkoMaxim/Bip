import { Module } from "@nestjs/common";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teacher } from "./teachers.model";
import { Lesson } from "src/lessons/lessons.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [SequelizeModule.forFeature([Teacher, Lesson]), AuthModule],
  exports: [TeachersService],
})
export class TeachersModule {}
