import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport, MicroserviceOptions} from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'channel-service',
        port: 3002,
      },
    },
  );
  await app.listen();
  console.info(`channel-service listening on 3002 for TCP`);
}

bootstrap();
