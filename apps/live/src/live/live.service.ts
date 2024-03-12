
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Live} from './entity/live.entity';
import {Repository} from 'typeorm';

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(Live) private readonly liveRepository: Repository<Live>,
  ) {}

  async create({title, description, channelId, streamKey}: {title: string, description: string, channelId: number, streamKey: string}) {
    // live 생성 시 현재 라이브 방송이 있는 지 확인 필요
    const checkLive = await this.liveRepository.findOne({where: {channelId}})
    if (checkLive) {
      throw new Error();
    }
    const hlsUrl = `/tmp/hls/${streamKey}/index.m3u8`;
    const thumbnail = `/thumb/thumbnail_${streamKey}.png`;
    const live = await this.liveRepository.save({
      description,
      title,
      channelId: channelId,
      hlsUrl,
      thumbnail
    });
    return live
  }
  async getLives() {
    return await this.liveRepository.find({});
  }
  async getLive(liveId: number) {
    return await this.liveRepository.findOne({where: {liveId}});
  }

  async endLive(channelId: number) {
    const live = await this.liveRepository.findOne({where: {channelId}});
    if (!live) {
      return null
    }
    return await this.liveRepository.softDelete(live)
  }

  async updateLive(liveId: number, title: string, description: string) {

    const live = await this.liveRepository.findOne({where: {liveId: liveId}})
    if (live.title !== title) {
      live.title = title;
      await this.liveRepository.update({liveId: live.liveId}, live);
    }
    if (live.description !== description) {
      live.description = description;
    }

    return live;
  }
}
