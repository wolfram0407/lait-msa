import {Module} from '@nestjs/common';

import {ClientProxyFactory, Transport} from '@nestjs/microservices';
import {ChannelService} from './channel.service';
// 클라이언트 지정
@Module({
  exports: [ChannelService],
  providers: [
    ChannelService,
    {
      provide: 'CHANNEL_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'channel-service',
            port: 3002,
          },
        });
      },
    },
  ],
})
export class ChannelModule {}
