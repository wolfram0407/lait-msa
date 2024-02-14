
import {Controller, Get, Post, Redirect, Req, UseGuards, Request, Response, Res} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';

import {KakaoAuthGuard} from './guards/kakao.guard';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
    constructor(
    ) {}

    @UseGuards(KakaoAuthGuard)
    @Get('login/kakao')
    async kakao(@Req() req): Promise<void> {
    }

    @UseGuards(KakaoAuthGuard)
    @Redirect('/')
    @Get('/login/kakao/callback')
    async callbacks(@Req() req, @Res({passthrough: true}) res) {
        console.log("kakao callback");
        res.cookie('Authorization', req.user.access_token);
    }
}
