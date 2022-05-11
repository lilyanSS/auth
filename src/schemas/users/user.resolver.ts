import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './user.service';
import { User } from '../../db/models/user.entity';
import { Public } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../schemas/role/roles.decorator';
import { RolesGuard } from '../role/guard/roles.guard';
import { Rol } from '../../db/seeders/role/data';
@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) { }

    @Query()
    @Public()
    async userLogin(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<User> {
        return this.userService.userLogin(email, password);
    }

    @Public()
    @Mutation()
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string,
        @Args('isAdmin') isAdmin: boolean
    ): Promise<any> {
        return this.userService.createUser(email, password, firstName, lastName, isAdmin);
    }

    @Query()
    async getUserDataById(
        @Args('userId') userId: number
    ): Promise<User> {
        return this.userService.getUserDataById(userId);
    }

    @Query()
    @UseGuards(RolesGuard)
    @Roles(Rol.Admin)
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
}
