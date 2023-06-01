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
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import * as path from "path";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/categories.model";
import { PostsCategoriesModule } from "./posts-categories/posts-categories.module";
import { PostsCategories } from "./posts-categories/posts-categories.model";
import { AchievementsModule } from './achievements/achievements.module';

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
      models: [
        Lesson,
        Department,
        DepartmentLessons,
        Teacher,
        Post,
        Image,
        User,
        Role,
        UserRoles,
        Category,
        PostsCategories,
      ],
      autoLoadModels: true,
    }),
    LessonsModule,
    DepartmentsModule,
    TeachersModule,
    PostsModule,
    ImagesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    CategoriesModule,
    PostsCategoriesModule,
    AchievementsModule,
  ],
})
export class AppModule {}
