import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { LessonsModule } from "./lessons/lessons.module";
import { Lesson } from "./lessons/lessons.model";
import { DepartmentsModule } from "./departments/departments.module";
import { Department } from "./departments/departments.model";
import { DepartmentLessons } from "./departments/department-lessons.model";
import { TeachersModule } from "./teachers/teachers.module";
import { Teacher } from "./teachers/teachers.model";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/posts.model";
import { ImagesModule } from "./images/images.module";
import { Image } from "./images/images.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Lesson, Department, DepartmentLessons, Teacher, Post, Image],
      autoLoadModels: true,
    }),
    LessonsModule,
    DepartmentsModule,
    TeachersModule,
    PostsModule,
    ImagesModule,
  ],
})
export class AppModule {}
