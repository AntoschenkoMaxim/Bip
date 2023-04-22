import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImageDto } from "./dto/create-image.dto";

@Controller("images")
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createImageDto: CreateImageDto, @UploadedFile() image: any) {
    return this.imageService.createImage(createImageDto, image);
  }

  @Get()
  getAll() {
    return this.imageService.getAllImages();
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.imageService.removeImageById(id);
  }
}
