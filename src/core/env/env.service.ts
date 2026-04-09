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
}