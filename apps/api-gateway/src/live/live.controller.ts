
import {Controller, Get, Post, Redirect, Req, UseGuards, Request, Response, Res, Body, Logger, Param, Put, Patch} from '@nestjs/common';

import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {LiveService} from './live.service';
import {CreateLiveReqDto, UpdateLiveReqDto} from './dto/req.live.dto';


@ApiTags('Live')
@Controller('/api/live')
export class LiveController {
    constructor(
        private readonly liveService: LiveService
    ) {}

    @ApiOperation({
        summary: '라이브 등록',
        description: '라이브 등록',
    })
    @Post('create/:channelId')
    async createLive(
        @Body() createLiveReqDto: CreateLiveReqDto,
        @Param('channelId') channelId: string
    ) {
        const live = await this.liveService.create(createLiveReqDto, +channelId);
        return live;
    }

    @Get('')
    async getLives() {
        const live = await this.liveService.getLives();
        return live
    }


    @Put('end/:channelId')
    async endLive(
        @Param('channelId') channelId: string
    ) {
        const live = await this.liveService.endLive(+channelId)
        return live
    }


    @Patch(':liveId')
    async updateLive(
        @Param('liveId') liveId: string,
        @Body() {title}: UpdateLiveReqDto,
    ) {
        const live = await this.liveService.updateLive(+liveId, title);
        return live;
    }
}
