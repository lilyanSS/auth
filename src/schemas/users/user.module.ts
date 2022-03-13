import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';


import { User } from '../../db/user.entity';
import { UsersResolver } from './user.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver]
})
export class UsersModule { }
