import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Role } from '../../models/role.entity';
import { Rol } from './data';

@Injectable()
export class RoleSeederService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private connection: Connection,
    ) { }

    create(): Array<Promise<Role>> {
        const rol = Object.values(Rol);
        return rol.map(async (r) => {
            return await this.roleRepository
                .findOne({ name: r })
                .then(async dbRol => {
                    if (dbRol) {
                        return Promise.resolve(null);
                    }
                    const queryRunner = this.connection.createQueryRunner();
                    await queryRunner.connect();
                    await queryRunner.startTransaction();
                    try {
                        const createRol = {
                            name: r
                        }
                        const data = await this.roleRepository.create(createRol);
                        await queryRunner.manager.save(data);
                        await queryRunner.commitTransaction();
                        return data;
                    } catch (err) {
                        await queryRunner.rollbackTransaction();
                        return err;
                    } finally {
                        await queryRunner.release();
                    }
                })
                .catch(error => console.log("error create:", error));
        });
    }
}
