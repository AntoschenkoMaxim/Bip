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
import { Lesson } from "src/lessons/lessons.model";
import { DepartmentLessons } from "./department-lessons.model";

interface DepartmentsCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, DepartmentsCreationAttrs> {
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

  @BelongsToMany(() => Lesson, () => DepartmentLessons)
  lessons: Lesson[];
}
