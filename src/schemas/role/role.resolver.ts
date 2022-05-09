import { Resolver, Query } from '@nestjs/graphql';
import { RoleController } from './role.controller';

@Resolver()
export class RoleResolver {
    constructor(
        private readonly roleService: RoleController
    ) { }

    @Query()
    async getRoles(): Promise<any> {
        return this.roleService.getRoles();
    }
}
