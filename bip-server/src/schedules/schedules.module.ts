import { Module } from "@nestjs/common";
import { SchedulesService } from "./schedules.service";
import { SchedulesController } from "./schedules.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Schedule } from "./schedules.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [SchedulesService],
  controllers: [SchedulesController],
  imports: [SequelizeModule.forFeature([Schedule]), FilesModule, AuthModule],
})
export class SchedulesModule {}
