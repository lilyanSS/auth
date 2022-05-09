import { SeedersModule } from './db/seeders/seeders.module';
import { Seeder } from './db/seeders/seeder'
import { NestFactory } from '@nestjs/core';
import { LogsService } from './logger/logs.service';

async function bootstrap() {
    NestFactory.createApplicationContext(SeedersModule)
        .then(appContext => {
            const logger = appContext.get(LogsService);
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(() => {
                    logger.debug('Seeding complete!');
                })
                .catch(error => {
                    logger.error('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();