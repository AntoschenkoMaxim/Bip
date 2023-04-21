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
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(@Param("id") id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePostById(id, updatePostDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.postService.removePostById(id);
  }
}
