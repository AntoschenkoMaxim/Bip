import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Lesson } from "src/lessons/lessons.model";
import { Department } from "./departments.model";

@Table({ tableName: "department_lessons", createdAt: false, updatedAt: false })
export class DepartmentLessons extends Model<DepartmentLessons> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  lessonId: number;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  departmentId: number;
}
