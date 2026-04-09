import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const isLocal = process.env.NODE_ENV === 'development';

const databaseURL = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

async function test() {
  const client = new Client({
    connectionString: databaseURL,
    ssl: isLocal
      ? false
      : { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Conectado com sucesso');

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);

    await client.end();
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
  }
}

test();