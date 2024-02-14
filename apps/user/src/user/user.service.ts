import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByKakaoId(id: string) {
    const user = this.userRepository.findOne({
      where: {kakaoId: id},
    });
    return user;
  }

  async create(
    {kakaoId, nickname, profileImage, provider}: {kakaoId: string, nickname: string, profileImage: string, provider: string}) {
    const user = await this.userRepository.save({
      kakaoId,
      nickname,
      profileImage,
      provider,
    });
    return user;
  }
}
