import { Module } from "@nestjs/common";
import { PricesService } from "./prices.service";
import { PricesController } from "./prices.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Price } from "./prices.model";
import { FilesModule } from "src/files/files.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [PricesService],
  controllers: [PricesController],
  imports: [SequelizeModule.forFeature([Price]), FilesModule, AuthModule],
})
export class PricesModule {}
