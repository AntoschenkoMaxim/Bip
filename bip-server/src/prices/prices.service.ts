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
    price_image: any,
    payment_image: any
  ) {
    const priceFileName = await this.fileService.createFile(price_image);
    // const paymentFileName = await this.fileService.createFile(payment_image);
    const price = await this.priceRepository.create({
      ...createPriceDto,
      price_image: priceFileName,
      payment_image: priceFileName,
    });
    return price;
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
    price_image: any,
    payment_image: any
  ) {
    const price = await this.getPriceById(id);
    if (price) {
      await this.fileService.removeFile(price_image);
      await this.fileService.removeFile(payment_image);
      const priceFileName = await this.fileService.createFile(price_image);
      const paymentFileName = await this.fileService.createFile(payment_image);
      await this.priceRepository.update(
        {
          ...updatePriceDto,
          price_image: priceFileName,
          payment_image: paymentFileName,
        },
        { where: { id } }
      );
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
