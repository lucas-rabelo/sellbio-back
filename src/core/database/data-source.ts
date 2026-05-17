import 'dotenv/config';
import { DataSource } from 'typeorm';

const databaseURL = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
console.log('DATABASE_URL:', databaseURL);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseURL,
  entities: ['src/core/database/entities**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  ssl: false,
});