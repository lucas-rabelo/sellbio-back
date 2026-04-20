import 'dotenv/config';
import { DataSource } from 'typeorm';

const databaseURL = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseURL,
  entities: ['src/infra/database/entities**/*.entity.ts'],
  migrations: ['src/infra/database/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  ssl: false,
});