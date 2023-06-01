import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { AchievementsService } from "./achievements.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAchievementDto } from "./dto/create-post.dto";
import { UpdateAchievementDto } from "./dto/update-post.dto";

@Controller("achievements")
export class AchievementsController {
  constructor(private achivementService: AchievementsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createAchievementDto: CreateAchievementDto,
    @UploadedFile() image: any
  ) {
    return this.achivementService.createAchievement(
      createAchievementDto,
      image
    );
  }

  @Get()
  getAll() {
    return this.achivementService.getAllAchievements();
  }

  @UsePipes(ValidationPipe)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  updateById(
    @Param("id") id: number,
    @Body() updateAchievementDto: UpdateAchievementDto,
    @UploadedFile() image: any
  ) {
    return this.achivementService.updateAchievementById(
      id,
      updateAchievementDto,
      image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.achivementService.removeAchievementById(id);
  }
}
