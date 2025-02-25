import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.APP_API_PORT
  ? parseInt(process.env.APP_API_PORT, 10)
  : 3000;

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: true });

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap(port).then(() =>
  console.log('Service listening 👍: ', process.env.APP_API_PORT),
);
