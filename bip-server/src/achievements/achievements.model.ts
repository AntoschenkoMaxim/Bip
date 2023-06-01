import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { PostsCategories } from "src/posts-categories/posts-categories.model";

interface AchievementsCreationAttrs {
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: "achievements" })
export class Achievement extends Model<Achievement, AchievementsCreationAttrs> {
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
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
