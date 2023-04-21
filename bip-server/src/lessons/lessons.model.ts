import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { DepartmentLessons } from "src/departments/department-lessons.model";
import { Department } from "src/departments/departments.model";
import { Teacher } from "src/teachers/teachers.model";

interface LessonsCreationAttrs {
  value: string;
  description: string;
  teacherId: number;
}

@Table({ tableName: "lessons" })
export class Lesson extends Model<Lesson, LessonsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.INTEGER,
  })
  teacherId: number;

  @BelongsToMany(() => Department, () => DepartmentLessons)
  departments: Department[];

  @BelongsTo(() => Teacher)
  teacher: Teacher;
}
