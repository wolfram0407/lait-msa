import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';

import {KakaoStrategy} from './strategies/kakao.strategy';
import {ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';

import {UserModule} from '../user/user.module';

import {ChannelModule} from 'src/channel/channel.module';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get('jwt.secret'),
                signOptions: {expiresIn: '1d'},
            }),
        }),
        UserModule,
        ChannelModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, KakaoStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
