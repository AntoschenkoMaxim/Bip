import { Column, DataType, Model, Table } from "sequelize-typescript";

interface StatementsCreationAttrs {
  title: string;
  image: string;
}

@Table({ tableName: "statements" })
export class Statement extends Model<Statement, StatementsCreationAttrs> {
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
