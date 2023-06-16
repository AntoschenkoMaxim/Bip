import { Module } from "@nestjs/common";
import { StatementsService } from "./statements.service";
import { StatementsController } from "./statements.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Statement } from "./statements.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [StatementsService],
  controllers: [StatementsController],
  imports: [SequelizeModule.forFeature([Statement]), FilesModule, AuthModule],
})
export class StatementsModule {}
