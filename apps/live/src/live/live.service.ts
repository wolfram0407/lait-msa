
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
    const checkLive = await this.liveRepository.findOne({where: {channelId, status: true}})
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
    return await this.liveRepository.find({where: {status: true}});
  }

  async endLive(channelId: number) {
    const live = await this.liveRepository.findOne({where: {channelId, status: true}});
    live.status = false;

    const updateLive = await this.liveRepository.update({liveId: live.liveId}, live);
    return updateLive
  }

  async updateLive(liveId: number, title: string) {
    const live = await this.liveRepository.findOne({where: {liveId}})
    if (!live.status) {
      // 종료된 방송
      console.log("종료된 방송")
    }
    if (live.title !== title) {
      // 변경 
      live.title = title;
      await this.liveRepository.update({liveId}, live);
    }
    return live;
  }
}
