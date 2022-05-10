import { Module, forwardRef } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import configuration from './config/configuration';
import { UsersModule } from './schemas/users/user.module';
import { AuthModule } from './schemas/auth/auth.module';
import { RoleModule } from './schemas/role/role.module';
import { GqlAuthGuard} from './schemas/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      typePaths: ['./**/*.gql'],
    }),
    TypeOrmModule.forRoot(configuration),
    UsersModule,
    AuthModule,
    forwardRef(() => RoleModule),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [TypeOrmModule]
})


export class AppModule { }

