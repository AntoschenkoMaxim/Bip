import { Module } from "@nestjs/common";
import { AchievementsService } from "./achievements.service";
import { AchievementsController } from "./achievements.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Achievement } from "./achievements.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [AchievementsService],
  controllers: [AchievementsController],
  imports: [SequelizeModule.forFeature([Achievement]), FilesModule, AuthModule],
})
export class AchievementsModule {}
