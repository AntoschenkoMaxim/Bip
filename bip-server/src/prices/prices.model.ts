import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PricesCreationAttrs {
  title: string;
  price_image: string;
  payment_image: string;
}

@Table({ tableName: "prices" })
export class Price extends Model<Price, PricesCreationAttrs> {
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
  price_image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_image: string;
}
