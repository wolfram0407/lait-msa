import {Controller, Get} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @MessagePattern({cmd: 'channel_create'})
  async createChannel({description, channelImage, streamKey, userId}: {
    description: string, channelImage: string, streamKey: string, userId: number
  }) {
    const channel = await this.channelService.create({description, channelImage, userId})

    return channel
  }

  @MessagePattern({cmd: 'channel_get_stream_key'})
  async getStreamKey(channelId: number) {
    const channel = await this.channelService.getChannel(channelId)

    return channel
  }

}
