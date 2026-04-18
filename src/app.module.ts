import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ZodValidationPipe, ZodSerializerInterceptor  } from 'nestjs-zod';
import { Module } from '@nestjs/common';
import { EnvModule } from '@/app/core/env';
import { UsersModule } from './modules/users/users.module';
import { HttpExceptionFilter } from './core/exceptions/http.exception';

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