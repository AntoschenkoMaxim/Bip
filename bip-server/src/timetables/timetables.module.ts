import { Module } from "@nestjs/common";
import { TimetablesService } from "./timetables.service";
import { TimetablesController } from "./timetables.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Timetable } from "./timetables.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [TimetablesService],
  controllers: [TimetablesController],
  imports: [SequelizeModule.forFeature([Timetable]), FilesModule, AuthModule],
})
export class TimetablesModule {}
