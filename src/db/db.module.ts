import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


export const DatabaseConnection = "DATABASE_CONNECTION"
@Module({
    imports: [ConfigModule],
    providers: [{
        provide: DatabaseConnection,
        useFactory: async (configService: ConfigService) => {
            const queryClient = postgres(configService.get<string>('DATABASE_URL'), {
                ssl: {
                    rejectUnauthorized: false
                },
                user: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                max: 20
            });
            const db = drizzle(queryClient);
            return db;
        },
        inject: [ConfigService],
    }],
    exports: [DatabaseConnection]
})


export class DatabaseModule {}