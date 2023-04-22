import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./images.model";
import { FilesService } from "src/files/files.service";
import { CreateImageDto } from "./dto/create-image.dto";

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageRepository: typeof Image,
    private fileService: FilesService
  ) {}

  async createImage(createImageDto: CreateImageDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const configuredImage = await this.imageRepository.create({
      ...createImageDto,
      image: fileName,
    });
    return configuredImage;
  }

  async getAllImages() {
    const images = await this.imageRepository.findAndCountAll({
      order: [["id", "ASC"]],
    });
    return images;
  }

  async getImageById(id: number) {
    const image = await this.imageRepository.findOne({ where: { id } });
    return image;
  }

  async removeImageById(id: number) {
    const image = await this.getImageById(id);
    if (!image) {
      throw new HttpException("Image not found!", HttpStatus.NOT_FOUND);
    }
    await this.fileService.removeFile(image.image);
    await this.imageRepository.destroy({ where: { id } });
  }
}
