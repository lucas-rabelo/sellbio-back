import { Injectable } from '@nestjs/common';
import { env } from './env';
import { NODE_ENV } from '../constants';

@Injectable()
export class EnvService {
  get<K extends keyof typeof env>(key: K): (typeof env)[K] {
    return env[key];
  }

  getAll() {
    return env;
  }

  isProduction() {
    return env.NODE_ENV === NODE_ENV.PRD;
  }

  isStaging() {
    return env.NODE_ENV === NODE_ENV.HML;
  }

  isDevelopment() {
    return env.NODE_ENV === NODE_ENV.DEV;
  }

  urlDatabase() {
    const user = this.get('DATABASE_USER');
    const pass = this.get('DATABASE_PASS');
    const host = this.get('DATABASE_HOST');
    const port = this.get('DATABASE_PORT');
    const name = this.get('DATABASE_NAME');

    return `postgresql://${user}:${pass}@${host}:${port}/${name}`;
  }
}
