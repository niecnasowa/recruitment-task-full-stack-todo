import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // I enable it because this project is kinda mvp, to show my skills only
  // It is not and shouldn't be ever deployed anywhere
  // In real life Corses should be configured according to needs (and security)
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
