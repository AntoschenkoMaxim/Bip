import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TimetablesCreationAttrs {
  title: string;
  image: string;
}

@Table({ tableName: "timetables" })
export class Timetable extends Model<Timetable, TimetablesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
