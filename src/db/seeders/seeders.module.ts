import { Module, forwardRef } from '@nestjs/common';
import { RoleSeederModule } from './role/roles-seeder.module';
import { Seeder } from './seeder';
import { AppModule, } from '../../app.module';
import { LogsService } from '../../logger/logs.service';

@Module({
  imports: [
    RoleSeederModule,
    forwardRef(() => AppModule),
  ],
  providers: [
    Seeder,
    LogsService
  ]
})
export class SeedersModule { }
