import {AuthService} from './../auth.service';

import {Injectable, Logger, Res} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, Profile} from 'passport-kakao';
import * as _ from 'lodash';
import {Response} from 'express';
import {UserService} from 'src/user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: configService.get('kakao.key'),
            callbackURL: '/api/auth/login/kakao/callback',
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any, @Res() res: Response): Promise<any> {
        const kakaoId = profile.id;
        const nickname = profile._json.properties.nickname;
        const profileImage = profile._json.properties.profile_image;
        const provider = profile.provider;
        let user = await this.authService.validateUser(kakaoId);
        if (!user) {
            user = await this.authService.create({kakaoId, nickname, profileImage, provider})
            Logger.log("!")
        }
        Logger.log(user)
        const access_token = await this.authService.createAccessToken(user.userId);
        const Bearer = 'Bearer ' + access_token

        return {access_token: Bearer};
    }
}
