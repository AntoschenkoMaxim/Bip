import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }

  @Patch(":id")
  updateById(@Param("id") id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePostById(id, updatePostDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.postService.removePostById(id);
  }
}
