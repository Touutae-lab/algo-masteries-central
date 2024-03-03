import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function runMigrations() {
  const configService = new ConfigService(); // Assuming this correctly initializes and loads your .env or env vars

  // Create the postgres client using environment variables
  const queryClient = postgres(configService.get<string>('DATABASE_URL'), {
    ssl: configService.get<boolean>('DATABASE_SSL') ? { rejectUnauthorized: false } : undefined,
    user: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    max: configService.get<number>('DATABASE_POOL_MAX') || 20,
  });

  const db = drizzle(queryClient);

  // Specify the migrations folder path relative to the root of your project
  await migrate(db, { migrationsFolder: '../../infrastructure/db/migration' })
      .then(() => console.log('Migrations complete!'))
      .catch(err => console.error('Migrations failed!', err));
}

runMigrations();