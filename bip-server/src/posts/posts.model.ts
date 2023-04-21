import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PostsCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostsCreationAttrs> {
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
}
