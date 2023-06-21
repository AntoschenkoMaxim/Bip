import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Timetable } from "./timetables.model";
import { FilesService } from "src/files/files.service";
import { CreateTimetableDto } from "./dto/create-timetable.dto";
import { UpdateTimetableDto } from "./dto/update-timetable.dto";

@Injectable()
export class TimetablesService {
  constructor(
    @InjectModel(Timetable) private timetableRepository: typeof Timetable,
    private fileService: FilesService
  ) {}

  async createTimetable(createTimetableDto: CreateTimetableDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const statement = await this.timetableRepository.create({
      ...createTimetableDto,
      image: fileName,
    });
    return statement;
  }

  async getAllTimetables() {
    const timetables = await this.timetableRepository.findAndCountAll({
      order: [["date", "ASC"]],
    });
    return timetables;
  }

  async getTimetableById(id: number) {
    const timetable = await this.timetableRepository.findOne({ where: { id } });
    if (!timetable) {
      throw new HttpException("Timetable not found!", HttpStatus.NOT_FOUND);
    }
    return timetable;
  }

  async updateTimetableById(
    id: number,
    updateTimetableDto: UpdateTimetableDto,
    image: any
  ) {
    const timetable = await this.getTimetableById(id);
    if (timetable) {
      await this.fileService.removeFile(timetable.image);
      const fileName = await this.fileService.createFile(image);
      await this.timetableRepository.update(
        { ...updateTimetableDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeTimetableById(id: number) {
    const timetable = await this.getTimetableById(id);
    if (timetable) {
      await this.fileService.removeFile(timetable.image);
      await this.timetableRepository.destroy({ where: { id } });
    }
  }
}
