import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostsCategories } from "./posts-categories.model";
import { CreatePostsCategoryDto } from "./dto/create-posts-category.dto";
import { UpdatePostsCategoryDto } from "./dto/update-posts-category.dto copy";

@Injectable()
export class PostsCategoriesService {
  constructor(
    @InjectModel(PostsCategories)
    private postsCategoriesRepository: typeof PostsCategories
  ) {}

  async createPostsCategory(createPostsCategoryDto: CreatePostsCategoryDto) {
    const category = await this.getPostsCategoryByValue(
      createPostsCategoryDto.value
    );
    if (!category) {
      const newCategory = await this.postsCategoriesRepository.create(
        createPostsCategoryDto
      );
      return newCategory;
    }
  }

  async getAllPostsCategories() {
    const postsCategories =
      await this.postsCategoriesRepository.findAndCountAll({
        include: { all: true },
        order: [["id", "ASC"]],
        distinct: true,
      });
    return postsCategories;
  }

  async getPostsCategoryByValue(value: string) {
    const postsCategory = await this.postsCategoriesRepository.findOne({
      where: { value },
    });
    if (postsCategory) {
      throw new HttpException(
        "PostsCategory with this value already exists!",
        HttpStatus.NOT_FOUND
      );
    }
    return postsCategory;
  }

  async getPostsCategoryById(id: number) {
    const postsCategory = await this.postsCategoriesRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!postsCategory) {
      throw new HttpException("PostsCategory not found!", HttpStatus.NOT_FOUND);
    }
    return postsCategory;
  }

  async updatePostsCategoryById(
    id: number,
    updatePostsCategoryDto: UpdatePostsCategoryDto
  ) {
    const category = await this.getPostsCategoryById(id);
    if (category) {
      await this.postsCategoriesRepository.update(updatePostsCategoryDto, {
        where: { id },
      });
    }
  }

  async removePostsCategoryById(id: number) {
    const category = await this.getPostsCategoryById(id);
    if (category) {
      await this.postsCategoriesRepository.destroy({ where: { id } });
    }
  }
}
