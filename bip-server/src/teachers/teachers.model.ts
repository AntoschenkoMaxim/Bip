import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Lesson } from "src/lessons/lessons.model";

interface TeachersCreationAttrs {
  firstName: string;
  lastName: string;
  surname: string;
  role: string;
  phone: string;
  email: string;
  telegram: string;
}

@Table({ tableName: "teachers" })
export class Teacher extends Model<Teacher, TeachersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  telegram: string;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}
