import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Price } from "./prices.model";
import { FilesService } from "src/files/files.service";
import { UpdatePriceDto } from "./dto/update-price.dto";
import { CreatePriceDto } from "./dto/create-price.dto";

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(Price) private priceRepository: typeof Price,
    private fileService: FilesService
  ) {}

  async createPrice(
    createPriceDto: CreatePriceDto,
    files: {
      price_image?: Express.Multer.File[];
      payment_image?: Express.Multer.File[];
    }
  ) {
    if (
      files &&
      files.price_image &&
      files.price_image.length > 0 &&
      files.payment_image &&
      files.payment_image.length > 0
    ) {
      const priceFileName = await this.fileService.createFile(
        files.price_image[0]
      );
      const paymentFileName = await this.fileService.createFile(
        files.payment_image[0]
      );
      const price = await this.priceRepository.create({
        ...createPriceDto,
        price_image: priceFileName,
        payment_image: paymentFileName,
      });
      return price;
    } else {
      throw new Error("Invalid file(s) provided!");
    }
  }

  async getAllPrices() {
    const prices = await this.priceRepository.findAndCountAll();
    return prices;
  }

  async getPriceById(id: number) {
    const price = await this.priceRepository.findOne({ where: { id } });
    if (!price) {
      throw new HttpException("Price not found!", HttpStatus.NOT_FOUND);
    }
    return price;
  }

  async updatePriceById(
    id: number,
    updatePriceDto: UpdatePriceDto,
    files: {
      price_image?: Express.Multer.File[];
      payment_image?: Express.Multer.File[];
    }
  ) {
    const price = await this.getPriceById(id);
    if (price) {
      await this.fileService.removeFile(price.price_image);
      await this.fileService.removeFile(price.payment_image);
      if (
        files &&
        files.price_image &&
        files.price_image.length > 0 &&
        files.payment_image &&
        files.payment_image.length > 0
      ) {
        const priceFileName = await this.fileService.createFile(
          files.price_image[0]
        );
        const paymentFileName = await this.fileService.createFile(
          files.payment_image[0]
        );
        await this.priceRepository.update(
          {
            ...updatePriceDto,
            price_image: priceFileName,
            payment_image: paymentFileName,
          },
          { where: { id } }
        );
      } else {
        throw new Error("Invalid file(s) provided!");
      }
    }
  }

  async removePriceById(id: number) {
    const price = await this.getPriceById(id);
    if (price) {
      await this.fileService.removeFile(price.price_image);
      await this.fileService.removeFile(price.payment_image);
      await this.priceRepository.destroy({ where: { id } });
    }
  }
}
