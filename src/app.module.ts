import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
console.log("proces2:", process.env.DATABASE_HOST, process.env.DATABASE_NAME)
