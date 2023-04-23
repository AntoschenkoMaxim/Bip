import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [SequelizeModule.forFeature([Image]), FilesModule, AuthModule],
})
export class ImagesModule {}
