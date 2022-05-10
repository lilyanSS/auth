import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from '../../db/models/user.entity';
import { Public } from '../auth/guards/jwt-auth.guard';

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
        @Args('lastName') lastName: string
    ): Promise<any> {
        return this.userService.createUser(email, password, firstName, lastName);
    }

}
