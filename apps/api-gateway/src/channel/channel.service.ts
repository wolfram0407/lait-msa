import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {CreateChannelReqDto} from './dto/req.auth.dto';

import {firstValueFrom} from 'rxjs';

@Injectable()
export class ChannelService {
  constructor(@Inject('CHANNEL_SERVICE') private client: ClientProxy) {}

  async create(createChannelReqDto: CreateChannelReqDto) {
    const {userId, description, channelImage} = createChannelReqDto;
    const pattern = {cmd: 'channel_create'};
    const payload = {description, channelImage, userId: userId};

    const channel = await firstValueFrom<any>(
      this.client.send<{id: string}>(pattern, payload),
    );
    return channel
  }

  async getChannel(channelId: number) {
    const pattern = {cmd: 'channel_get_stream_key'};
    const payload = channelId;
    const channel = await firstValueFrom<any>(
      this.client.send<{id: number}>(pattern, payload),
    );

    return channel
  }
}
