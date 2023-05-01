import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Image } from "src/images/images.model";

interface CategoriesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoriesCreationAttrs> {
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

  @HasMany(() => Image)
  images: Image[];
}
