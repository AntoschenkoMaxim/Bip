import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "src/categories/categories.model";

interface ImagesCreationAttrs {
  title: string;
  image: string;
}

@Table({ tableName: "images" })
export class Image extends Model<Image, ImagesCreationAttrs> {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
