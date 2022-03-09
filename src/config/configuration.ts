import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config()
const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: [join(__dirname, 'db/*.entity{.ts,.js}')],
    autoLoadEntities: true
};

export default config;