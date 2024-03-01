import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DatabaseService } from './db.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DatabaseService,
            useFactory: async (configService: ConfigService) => {
                const db = drizzle(postgres, {
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    database: configService.get('DB_DATABASE'),
                    user: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD')
                });
                await db.connect();
                return db;
            },
            inject: [ConfigService]
        }
    ],
    exports: [DatabaseService]
})

export class DbModule {};
