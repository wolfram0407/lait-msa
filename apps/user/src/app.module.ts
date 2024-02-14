import {Logger, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';

import jwtConfig from './config/jwt.config';
import {UserModule} from './user/user.module';


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
          host: configService.get('user_service.host'),
          port: configService.get('user_service.port'),
          database: configService.get('user_service.database'),
          username: configService.get('user_service.username'),
          password: configService.get('user_service.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        return obj;
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
}
