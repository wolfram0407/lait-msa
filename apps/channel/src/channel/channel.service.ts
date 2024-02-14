import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Channel} from './entity/channel.entity';
import {Repository} from 'typeorm';
import {randomBytes} from 'crypto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
  ) {}

  async create({description, channelImage, userId}: {
    description: string, channelImage: string, userId: number
  }) {
    const iv = randomBytes(12).toString('base64');
    const channel = await this.channelRepository.save({
      description,
      channelImage,
      streamKey: iv,
      userId: userId
    });
    return channel
  }

  async getChannel(channelId: number) {
    const channel = await this.channelRepository.findOne({where: {channelId}})
    console.log(channel)
    return channel


  }
}
