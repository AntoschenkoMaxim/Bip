import { Module } from "@nestjs/common";
import { PostsCategoriesService } from "./posts-categories.service";
import { PostsCategoriesController } from "./posts-categories.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsCategories } from "./posts-categories.model";
import { Post } from "src/posts/posts.model";

@Module({
  providers: [PostsCategoriesService],
  controllers: [PostsCategoriesController],
  imports: [SequelizeModule.forFeature([PostsCategories, Post])],
})
export class PostsCategoriesModule {}
