import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { Role } from '../../db/models/role.entity';
@Controller('role')
export class RoleController {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }

    async getRoles(): Promise<any> {
        const roles = await this.roleRepository.find({ where: { active: true } });
        return roles;
    }

}
