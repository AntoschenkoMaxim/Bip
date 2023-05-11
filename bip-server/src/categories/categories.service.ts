import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existedCategory = await this.getCategoryByValue(
      createCategoryDto.value
    );
    if (existedCategory) {
      throw new HttpException(
        "Category with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    const category = await this.categoryRepository.create(createCategoryDto);
    return category;
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.findAndCountAll({
      include: { all: true },
      order: [["id", "ASC"]],
      distinct: true,
    });
    return categories;
  }

  async getCategoryByValue(value: string) {
    const category = await this.categoryRepository.findOne({
      where: { value },
    });
    return category;
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return category;
  }

  async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existedCategory = await this.getCategoryByValue(
      updateCategoryDto.value
    );
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new HttpException("Category not found!", HttpStatus.NOT_FOUND);
    }
    if (existedCategory) {
      throw new HttpException(
        "Category with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.categoryRepository.update(updateCategoryDto, { where: { id } });
  }

  async removeCategoryById(id: number) {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new HttpException("Category not found!", HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.destroy({ where: { id } });
  }
}
