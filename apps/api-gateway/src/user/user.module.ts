import {Module} from '@nestjs/common';

import {UserService} from './user.service';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';
// 클라이언트 지정
@Module({
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'user-service',
            port: 3001,
          },
        });
      },
    },
  ],
})
export class UserModule {}
