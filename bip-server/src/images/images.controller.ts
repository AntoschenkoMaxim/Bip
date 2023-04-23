import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImageDto } from "./dto/create-image.dto";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("images")
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createImageDto: CreateImageDto, @UploadedFile() image: any) {
    return this.imageService.createImage(createImageDto, image);
  }

  @Get()
  getAll() {
    return this.imageService.getAllImages();
  }

  @Roles("moderator", "admin")
  @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.imageService.removeImageById(id);
  }
}
