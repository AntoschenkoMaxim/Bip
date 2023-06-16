import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SchedulesCreationAttrs {
  title: string;
  image: string;
}

@Table({ tableName: "schedules" })
export class Schedule extends Model<Schedule, SchedulesCreationAttrs> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
