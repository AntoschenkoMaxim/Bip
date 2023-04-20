import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

interface LessonsCreationAttrs {
  value: string;
  description: string;
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

  // @HasMany(() => Item)
  // items: Item[];

  // @BelongsToMany(() => Category, () => CategoryBrands)
  // category: Category[];
}
