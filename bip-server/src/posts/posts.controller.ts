import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.createPost(createPostDto, image);
  }

  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() image: any
  ) {
    return this.postService.updatePostById(id, updatePostDto, image);
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.postService.removePostById(id);
  }
}
