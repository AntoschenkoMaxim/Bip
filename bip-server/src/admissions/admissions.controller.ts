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
import { AdmissionsService } from "./admissions.service";
import { CreateAdmissionDto } from "./dto/create-admission.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateAdmissionDto } from "./dto/update-admission.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("admissions")
export class AdmissionsController {
  constructor(private admissionService: AdmissionsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createAdmissionDto: CreateAdmissionDto,
    @UploadedFile() image: any
  ) {
    return this.admissionService.createAdmission(createAdmissionDto, image);
  }

  @Get()
  getAll() {
    return this.admissionService.getAllAdmissions();
  }

  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor("image"))
  @Patch(":id")
  updateById(
    @Param("id") id: number,
    @Body() updateAdmissionDto: UpdateAdmissionDto,
    @UploadedFile() image: any
  ) {
    return this.admissionService.updateAdmissionById(
      id,
      updateAdmissionDto,
      image
    );
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.admissionService.removeAdmissionById(id);
  }
}
