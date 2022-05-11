import { Resolver, Query } from '@nestjs/graphql';
import { RoleController } from './role.controller';
import { UseGuards } from '@nestjs/common';

import { Roles } from './roles.decorator';
import { RolesGuard } from '../role/guard/roles.guard';
import { Rol } from '../../db/seeders/role/data';
@Resolver()
export class RoleResolver {
    constructor(
        private readonly roleService: RoleController
    ) { }

    @Query()
    @UseGuards(RolesGuard)
    @Roles(Rol.Admin)
    async getRoles(): Promise<any> {
        return this.roleService.getRoles();
    }
}
