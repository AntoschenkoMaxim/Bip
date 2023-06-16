import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdmissionsCreationAttrs {
  title: string;
  description: string;
  image: string;
}

@Table({ tableName: "admissions" })
export class Admission extends Model<Admission, AdmissionsCreationAttrs> {
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
