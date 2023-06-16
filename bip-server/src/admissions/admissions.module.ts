import { Module } from "@nestjs/common";
import { AdmissionsService } from "./admissions.service";
import { AdmissionsController } from "./admissions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admission } from "./admissions.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [AdmissionsService],
  controllers: [AdmissionsController],
  imports: [SequelizeModule.forFeature([Admission]), FilesModule, AuthModule],
})
export class AdmissionsModule {}
