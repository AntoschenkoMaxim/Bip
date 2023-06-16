import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Statement } from "./statements.model";
import { CreateStatementDto } from "./dto/create-statement.dto";
import { FilesService } from "src/files/files.service";
import { UpdateStatementDto } from "./dto/update-statement.dto";

@Injectable()
export class StatementsService {
  constructor(
    @InjectModel(Statement) private statementRepository: typeof Statement,
    private fileService: FilesService
  ) {}

  async createStatement(createStatementDto: CreateStatementDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const statement = await this.statementRepository.create({
      ...createStatementDto,
      image: fileName,
    });
    return statement;
  }

  async getAllStatements() {
    const statements = await this.statementRepository.findAndCountAll({
      order: [["createdAt", "ASC"]],
    });
    return statements;
  }

  async getStatementById(id: number) {
    const statement = await this.statementRepository.findOne({ where: { id } });
    if (!statement) {
      throw new HttpException("Statement not found!", HttpStatus.NOT_FOUND);
    }
    return statement;
  }

  async updateStatementById(
    id: number,
    updateStatementDto: UpdateStatementDto,
    image: any
  ) {
    const statement = await this.getStatementById(id);
    if (statement) {
      await this.fileService.removeFile(statement.image);
      const fileName = await this.fileService.createFile(image);
      await this.statementRepository.update(
        { ...updateStatementDto, image: fileName },
        { where: { id } }
      );
    }
  }

  async removeStatementById(id: number) {
    const statement = await this.getStatementById(id);
    if (statement) {
      await this.fileService.removeFile(statement.image);
      await this.statementRepository.destroy({ where: { id } });
    }
  }
}
