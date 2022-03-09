import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserController } from './user.controller';

import { User } from '../db/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserController]
})
export class UsersModule { }
