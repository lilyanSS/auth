import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';


import { User } from '../../db/user.entity';
import { UsersResolver } from './user.resolver';
import { AuthModule} from '../../schemas/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  providers: [UsersService, UsersResolver]
})
export class UsersModule { }
