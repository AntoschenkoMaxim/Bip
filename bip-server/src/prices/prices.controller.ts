import {
  Controller,
  Post,
  UploadedFile,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
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
      price_image: any;
      payment_image: any;
    }
  ) {
    return this.priceService.createPrice(
      createPriceDto,
      files.price_image,
      files.payment_image
    );
  }

  @Get()
  getAll() {
    return this.priceService.getAllPrices();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updatePriceDto: UpdatePriceDto,
    @UploadedFiles() price_image: any,
    @UploadedFile() payment_image: any
  ) {
    return this.priceService.updatePriceById(
      id,
      updatePriceDto,
      price_image,
      payment_image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.priceService.removePriceById(id);
  }
}
