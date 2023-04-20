import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Lesson } from "./lessons.model";

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [SequelizeModule.forFeature([Lesson])],
})
export class LessonsModule {}
