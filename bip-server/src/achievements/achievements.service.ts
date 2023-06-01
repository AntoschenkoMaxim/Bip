import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Achievement } from "./achievements.model";
import { CreateAchievementDto } from "./dto/create-post.dto";
import { FilesService } from "src/files/files.service";
import { UpdateAchievementDto } from "./dto/update-post.dto";

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement) private achievementRepository: typeof Achievement,
    private fileService: FilesService
  ) {}

  async createAchievement(
    createAchievementDto: CreateAchievementDto,
    image: any
  ) {
    const fileName = await this.fileService.createFile(image);
    const achievement = await this.achievementRepository.create({
      ...createAchievementDto,
      image: fileName,
    });
    return achievement;
  }

  async getAllAchievements() {
    const achievements = await this.achievementRepository.findAndCountAll({
      order: [["id", "ASC"]],
    });
    return achievements;
  }

  async getAchievementById(id: number) {
    const achievement = await this.achievementRepository.findOne({
      where: { id },
    });
    if (!achievement) {
      throw new HttpException("Achievement not found!", HttpStatus.NOT_FOUND);
    }
    return achievement;
  }

  async updateAchievementById(
    id: number,
    updateAchievementDto: UpdateAchievementDto,
    image: any
  ) {
    const achievement = await this.getAchievementById(id);
    if (achievement) {
      await this.fileService.removeFile(achievement.image);
      const fileName = await this.fileService.createFile(image);
      await this.achievementRepository.update(
        { ...updateAchievementDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeAchievementById(id: number) {
    const achievement = await this.getAchievementById(id);
    if (achievement) {
      await this.fileService.removeFile(achievement.image);
      await this.achievementRepository.destroy({ where: { id } });
    }
  }
}
