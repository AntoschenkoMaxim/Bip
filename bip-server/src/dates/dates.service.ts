import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Date } from "./dates.model";
import { CreateDateDto } from "./dto/create-date.dto";
import { FilesService } from "src/files/files.service";
import { UpdateDateDto } from "./dto/update-date.dto";

@Injectable()
export class DatesService {
  constructor(
    @InjectModel(Date) private dateRepository: typeof Date,
    private fileService: FilesService
  ) {}

  async createDate(createDateDto: CreateDateDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const date = await this.dateRepository.create({
      ...createDateDto,
      image: fileName,
    });
    return date;
  }

  async getAllDates() {
    const dates = await this.dateRepository.findAndCountAll();
    return dates;
  }

  async getDateById(id: number) {
    const date = await this.dateRepository.findOne({ where: { id } });
    if (!date) {
      throw new HttpException("Date not found!", HttpStatus.NOT_FOUND);
    }
    return date;
  }

  async updateDateById(id: number, updateDateDto: UpdateDateDto, image: any) {
    const date = await this.getDateById(id);
    if (date) {
      await this.fileService.removeFile(date.image);
      const fileName = await this.fileService.createFile(image);
      await this.dateRepository.update(
        { ...updateDateDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeDateById(id: number) {
    const date = await this.getDateById(id);
    if (date) {
      await this.fileService.removeFile(date.image);
      await this.dateRepository.destroy({ where: { id } });
    }
  }
}
