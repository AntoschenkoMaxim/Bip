import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const existedRole = await this.getRoleByValue(createRoleDto.value);
    if (existedRole) {
      throw new HttpException(
        "Role with this value already exists!",
        HttpStatus.BAD_REQUEST
      );
    }
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAndCountAll({
      order: [["id", "ASC"]],
    });
    return roles;
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async updateRoleById(id: number, updateDto: UpdateRoleDto) {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException("Role not found!", HttpStatus.NOT_FOUND);
    }
    await this.roleRepository.update(updateDto, { where: { id } });
  }

  async removeRoleById(id: number) {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException("Role not found!", HttpStatus.NOT_FOUND);
    }
    await this.roleRepository.destroy({ where: { id } });
  }
}
