import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';


import { User } from '../../db/models/user.entity';
import { UsersResolver } from './user.resolver';
import { AuthModule } from '../../schemas/auth/auth.module';
import { RoleModule } from '../../schemas/role/role.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    RoleModule
  ],
  providers: [UsersService, UsersResolver]
})
export class UsersModule { }
