import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admission } from "./admissions.model";
import { CreateAdmissionDto } from "./dto/create-admission.dto";
import { FilesService } from "src/files/files.service";
import { UpdateAdmissionDto } from "./dto/update-admission.dto";

@Injectable()
export class AdmissionsService {
  constructor(
    @InjectModel(Admission) private admissionRepository: typeof Admission,
    private fileService: FilesService
  ) {}

  async createAdmission(createAdmissionDto: CreateAdmissionDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const admission = await this.admissionRepository.create({
      ...createAdmissionDto,
      image: fileName,
    });
    return admission;
  }

  async getAllAdmissions() {
    const admissions = await this.admissionRepository.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
    return admissions;
  }

  async getAdmissionById(id: number) {
    const admission = await this.admissionRepository.findOne({ where: { id } });
    if (!admission) {
      throw new HttpException("Admission not found!", HttpStatus.NOT_FOUND);
    }
    return admission;
  }

  async updateAdmissionById(
    id: number,
    updateAdmissionDto: UpdateAdmissionDto,
    image: any
  ) {
    const admission = await this.getAdmissionById(id);
    if (admission) {
      await this.fileService.removeFile(admission.image);
      const fileName = await this.fileService.createFile(image);
      await this.admissionRepository.update(
        { ...updateAdmissionDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeAdmissionById(id: number) {
    const admission = await this.getAdmissionById(id);
    if (admission) {
      await this.fileService.removeFile(admission.image);
      await this.admissionRepository.destroy({ where: { id } });
    }
  }
}
