import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { FilesService } from "src/files/files.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async createPost(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName,
    });
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAndCountAll({
      order: [["date", "DESC"]],
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async updatePostById(id: number, updatePostDto: UpdatePostDto, image: any) {
    const post = await this.getPostById(id);
    if (!post) {
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
    }
    await this.fileService.removeFile(post.image);
    const fileName = await this.fileService.createFile(image);
    await this.postRepository.update(
      { ...updatePostDto, image: fileName },
      { where: { id } }
    );
  }

  async removePostById(id: number) {
    const post = await this.getPostById(id);
    if (!post) {
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
    }
    await this.fileService.removeFile(post.image);
    await this.postRepository.destroy({ where: { id } });
  }
}
