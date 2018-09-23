import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(helmet());
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());

  /**
   * TODO: Improve OpenAPI setup:
   * - Reusable @ApiResponse (e.g. not found, internal server error)
   * - Get Swagger specification dynamically (json/yml, without UI)
   * - Configure OpenAPI v3 specification
   * - Disallow empty userId path param
   */
  const documentOptions = new DocumentBuilder()
    .setBasePath('v1')
    .setTitle('Nest Proof of Concept')
    .setVersion('1.0.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
