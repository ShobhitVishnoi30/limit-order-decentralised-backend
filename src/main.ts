import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Limit-Orders')
    .setDescription('Limit Orders API description')
    .setVersion('1.0')
    .addTag('Orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = (await app.get(ConfigService).get('NODE_PORT')) || 3000;
  await app.listen(port, () => {
    Logger.log(`Server is running on ${port}`, `Application Server`);
  });
}
bootstrap();
