import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post("/role")
  add(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }
}
