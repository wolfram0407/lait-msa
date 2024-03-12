import {Module} from '@nestjs/common';

import {ClientProxyFactory, Transport} from '@nestjs/microservices';
import {LiveService} from './live.service';
import {LiveController} from './live.controller';
import {ChannelModule} from 'src/channel/channel.module';
// 클라이언트 지정
@Module({
  imports: [
    ChannelModule
  ],

  exports: [LiveService],
  controllers: [LiveController],
  providers: [
    LiveService,
    {
      provide: 'LIVE_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'live-service',
            port: 3003,
          },
        });
      },
    },
  ],
})

export class LiveModule {}
