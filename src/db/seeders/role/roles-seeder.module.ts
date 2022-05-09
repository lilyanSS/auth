import { Module } from '@nestjs/common';
import { RoleSeederService } from './role-seeder.service';
import { RoleModule } from '../../../schemas/role/role.module';

@Module({
  imports: [
    RoleModule
  ],
  providers: [RoleSeederService],
  exports: [RoleSeederService]
})

export class RoleSeederModule { }
