import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

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

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRoleById(id, updateRoleDto);
  }

  @Delete(":id")
  removeById(@Param("id") id: number) {
    return this.roleService.removeRoleById(id);
  }
}
