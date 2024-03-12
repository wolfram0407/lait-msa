
import {Logger, MiddlewareConsumer, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import {LoggerMiddleware} from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('live_service.host'),
          port: configService.get('live_service.port'),
          database: configService.get('live_service.database'),
          username: configService.get('live_service.username'),
          password: configService.get('live_service.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        return obj;
      },
    }),
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
