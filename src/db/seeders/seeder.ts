import { Injectable } from '@nestjs/common';
import { RoleSeederService } from '../seeders/role/role-seeder.service';
import { LogsService } from '../../logger/logs.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: LogsService,
        private readonly roleSeederService: RoleSeederService,
    ) { }
    async seed() {
        await this.roles()
            .then(completed => {
                this.logger.log('role successfully created....');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Role creation has failed...');
                Promise.reject(error);
            });
    }
    async roles() {
        return await Promise.all(this.roleSeederService.create())
            .then(rolesCreated => {
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
}