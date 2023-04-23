import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  getAll() {
    return this.roleService.getAllRoles();
  }

  @Get(":value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRoleById(id, updateRoleDto);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.roleService.removeRoleById(id);
  }
}
