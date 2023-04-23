import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([Post]), FilesModule, AuthModule],
})
export class PostsModule {}
