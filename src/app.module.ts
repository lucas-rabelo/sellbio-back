import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ZodValidationPipe, ZodSerializerInterceptor  } from 'nestjs-zod';
import { Module } from '@nestjs/common';
import { EnvModule } from '@/core/env';
import { UsersModule } from './modules/users';
import { HttpExceptionFilter } from './core';

@Module({
  imports: [
    EnvModule,
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
export class AppModule {}