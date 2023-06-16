import { Module } from "@nestjs/common";
import { DatesService } from "./dates.service";
import { DatesController } from "./dates.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Date } from "./dates.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [DatesService],
  controllers: [DatesController],
  imports: [SequelizeModule.forFeature([Date]), FilesModule, AuthModule],
})
export class DatesModule {}
