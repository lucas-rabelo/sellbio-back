import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, type SwaggerCustomOptions } from '@nestjs/swagger';
import { cleanupOpenApiDoc, ZodValidationPipe } from 'nestjs-zod';
import { SwaggerTheme, type SwaggerThemeName } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ZodValidationPipe());

  const documentBuilder = new DocumentBuilder()
    .setTitle('SellBio API')
    .setDescription('SaaS NestJS API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    customCss: theme.getBuffer('dark' as SwaggerThemeName),
    customSiteTitle: 'SellBio API Docs'
  };

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs/api', app, cleanupOpenApiDoc(document), options);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
