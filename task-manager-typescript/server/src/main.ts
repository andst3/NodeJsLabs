import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);


  // app.use((req, res, next) => cors({
  //   origin: '*'
  // })(req, res, next));
}
bootstrap();