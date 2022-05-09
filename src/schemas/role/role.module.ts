import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../db/models/role.entity';
import { RoleResolver } from './role.resolver';
import { RoleController } from './role.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
    ],
    providers: [RoleResolver, RoleController],
    exports: [TypeOrmModule],
})

export class RoleModule { }
