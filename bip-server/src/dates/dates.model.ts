import { Column, DataType, Model, Table } from "sequelize-typescript";

interface DatesCreationAttrs {
  title: string;
  image: string;
}

@Table({ tableName: "dates" })
export class Date extends Model<Date, DatesCreationAttrs> {
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
