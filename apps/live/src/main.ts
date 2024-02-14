import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport, MicroserviceOptions} from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'live-service',
        port: 3003,
      },
    },
  );
  await app.listen();
  console.info(`live-service listening on 3003 for TCP`);
}

bootstrap();
