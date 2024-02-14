
import {Logger, MiddlewareConsumer, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import kakaoConfig from './config/kakao.config';
import {ChannelModule} from './channel/channel.module';
import {LiveModule} from './live/live.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig, jwtConfig, kakaoConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('gateway.host'),
          port: configService.get('gateway.port'),
          database: configService.get('gateway.database'),
          username: configService.get('gateway.username'),
          password: configService.get('gateway.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        return obj;
      },
    }),
    AuthModule,
    UserModule,
    ChannelModule,
    LiveModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
