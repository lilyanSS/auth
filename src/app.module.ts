import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import configuration from './config/configuration';
import { UsersModule } from './schemas/users/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      typePaths: ['./**/*.gql'],
    }),
    TypeOrmModule.forRoot(configuration),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }

