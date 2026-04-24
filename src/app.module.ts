import { EnvModule } from '@/core/env';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { HttpExceptionFilter } from './core/exceptions/http.exception';

import { AuthModule } from './modules/app/auth/auth.module';
import { UsersModule } from './modules/app/users/users.module';

@Module({
  imports: [
    EnvModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule { }