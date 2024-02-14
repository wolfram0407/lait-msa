import {Controller, Get, Logger} from '@nestjs/common';
import {LiveService} from './live.service';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @MessagePattern({cmd: 'live_create'})
  async createLive({title, description, channelId, streamKey}: {title: string, description: string, channelId: number, streamKey: string}) {
    const live = await this.liveService.create({title, description, channelId, streamKey})
    Logger.log(live);
    return live
  }

  @MessagePattern({cmd: 'live_get'})
  async getLives() {
    const lives = await this.liveService.getLives();
    return lives
  }

  @MessagePattern({cmd: 'live_end'})
  async endLive(channelId: number) {
    const live = await this.liveService.endLive(channelId);
    return live;
  }

  @MessagePattern({cmd: 'live_update'})
  async updateLive(liveId: number, title: string) {
    const live = await this.liveService.updateLive(liveId, title);
    return live;
  }

}
