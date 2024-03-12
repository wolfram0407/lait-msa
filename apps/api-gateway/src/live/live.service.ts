import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {CreateLiveReqDto, UpdateLiveReqDto} from './dto/req.live.dto';
import {firstValueFrom} from 'rxjs';
import {ChannelService} from 'src/channel/channel.service';

@Injectable()
export class LiveService {
  constructor(
    @Inject('LIVE_SERVICE') private client: ClientProxy,
    private readonly channelService: ChannelService,
  ) {}

  async create(createLiveReqDto: CreateLiveReqDto, channelId: number) {
    const {streamKey} = await this.channelService.getChannel(channelId)

    const pattern = {cmd: 'live_create'};
    const payload = {
      ...createLiveReqDto,
      channelId,
      streamKey
    }
    const live = await firstValueFrom<any>(
      this.client.send<any>(pattern, payload),
    );
    return live
  }

  async getLives() {
    const pattern = {cmd: 'live_get'};
    const payload = {};

    const lives = await firstValueFrom<any>(
      this.client.send<{}>(pattern, payload),
    );
    return lives
  }
  async getLive(liveId: number) {
    const pattern = {cmd: 'live_getOne'};
    const payload = liveId;
    const live = await firstValueFrom<any>(
      this.client.send<{}>(pattern, payload),
    );
    return live
  }

  async endLive(channelId: number) {
    const pattern = {cmd: 'live_end'};
    const payload = channelId
    const live = await firstValueFrom<any>(
      this.client.send<any>(pattern, payload),
    );
    return live;
  }

  async updateLive(liveId: number, {title, description}: UpdateLiveReqDto) {
    const pattern = {cmd: 'live_update'};
    const payload = {liveId, title, description};
    const live = await firstValueFrom<any>(
      this.client.send<any>(pattern, payload),
    );
    return live;
  }

}
