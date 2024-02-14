import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import jwtConfig from './config/jwt.config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ChannelModule} from './channel/channel.module';

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
          host: configService.get('channel_service.host'),
          port: configService.get('channel_service.port'),
          database: configService.get('channel_service.database'),
          username: configService.get('channel_service.username'),
          password: configService.get('channel_service.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        return obj;
      },
    }),
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
