import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Schedule } from "./schedules.model";
import { FilesService } from "src/files/files.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    private fileService: FilesService
  ) {}

  async createSchedule(createScheduleDto: CreateScheduleDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const schedule = await this.scheduleRepository.create({
      ...createScheduleDto,
      image: fileName,
    });
    return schedule;
  }

  async getAllSchedules() {
    const schedules = await this.scheduleRepository.findAndCountAll();
    return schedules;
  }

  async getScheduleById(id: number) {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      throw new HttpException("Schedule not found!", HttpStatus.NOT_FOUND);
    }
    return schedule;
  }

  async updateScheduleById(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
    image: any
  ) {
    const schedule = await this.getScheduleById(id);
    if (schedule) {
      await this.fileService.removeFile(schedule.image);
      const fileName = await this.fileService.createFile(image);
      await this.scheduleRepository.update(
        { ...updateScheduleDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeScheduleById(id: number) {
    const schedule = await this.getScheduleById(id);
    if (schedule) {
      await this.fileService.removeFile(schedule.image);
      await this.scheduleRepository.destroy({ where: { id } });
    }
  }
}
