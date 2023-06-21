import {
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UploadedFiles,
} from "@nestjs/common";
import { PricesService } from "./prices.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";

@Controller("prices")
export class PricesController {
  constructor(private priceService: PricesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "price_image", maxCount: 1 },
      { name: "payment_image", maxCount: 1 },
    ])
  )
  create(
    @Body() createPriceDto: CreatePriceDto,
    @UploadedFiles()
    files: {
      price_image?: Express.Multer.File[];
      payment_image?: Express.Multer.File[];
    }
  ) {
    return this.priceService.createPrice(createPriceDto, files);
  }

  @Get()
  getAll() {
    return this.priceService.getAllPrices();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "price_image", maxCount: 1 },
      { name: "payment_image", maxCount: 1 },
    ])
  )
  updateById(
    @Param("id") id: number,
    @Body() updatePriceDto: UpdatePriceDto,
    @UploadedFiles()
    files: {
      price_image?: Express.Multer.File[];
      payment_image?: Express.Multer.File[];
    }
  ) {
    return this.priceService.updatePriceById(id, updatePriceDto, files);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.priceService.removePriceById(id);
  }
}
