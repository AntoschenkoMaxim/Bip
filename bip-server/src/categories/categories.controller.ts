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
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("image-categories")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategoryById(id, updateCategoryDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.categoryService.removeCategoryById(id);
  }
}
