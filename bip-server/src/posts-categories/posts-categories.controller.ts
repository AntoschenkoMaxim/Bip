import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { PostsCategoriesService } from "./posts-categories.service";
import { CreatePostsCategoryDto } from "./dto/create-posts-category.dto";
import { UpdatePostsCategoryDto } from "./dto/update-posts-category.dto copy";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("posts-categories")
export class PostsCategoriesController {
  constructor(private postsCategoriesService: PostsCategoriesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createPostsCategoryDto: CreatePostsCategoryDto) {
    return this.postsCategoriesService.createPostsCategory(
      createPostsCategoryDto
    );
  }

  @Get()
  getAll() {
    return this.postsCategoriesService.getAllPostsCategories();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updatePostsCategoryDto: UpdatePostsCategoryDto
  ) {
    return this.postsCategoriesService.updatePostsCategoryById(
      id,
      updatePostsCategoryDto
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.postsCategoriesService.removePostsCategoryById(id);
  }
}
