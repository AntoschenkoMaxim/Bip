import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.postRepository.create(createPostDto);
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAndCountAll({
      order: [["id", "ASC"]],
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async updatePostById(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.getPostById(id);
    if (!post) {
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update(updatePostDto, { where: { id } });
  }

  async removePostById(id: number) {
    const post = await this.getPostById(id);
    if (!post) {
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
    }
    await this.postRepository.destroy({ where: { id } });
  }
}
