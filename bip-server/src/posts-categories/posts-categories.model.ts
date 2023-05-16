import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";

interface PostsCategoriesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "posts-categories" })
export class PostsCategories extends Model<
  PostsCategories,
  PostsCategoriesCreationAttrs
> {
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

  @HasMany(() => Post)
  posts: Post[];
}
