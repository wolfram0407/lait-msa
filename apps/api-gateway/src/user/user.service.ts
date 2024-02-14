import {Inject, Injectable, Logger} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {firstValueFrom} from 'rxjs'; 2
import {CreateUserReqDto} from './dto/req.auth.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async create(createUserReqDto: CreateUserReqDto) {
    const {kakaoId, nickname, profileImage, provider} = createUserReqDto;
    const pattern = {cmd: 'create'};
    const payload = {kakaoId, nickname, profileImage, provider};
    const user = await firstValueFrom<any>(
      this.client.send<{id: string}>(pattern, payload),
    );
    return user;
  }

  async findByKakaoId(id: string) {
    const pattern = {cmd: 'findByKakaoId'};
    const payload = id;
    const user = await firstValueFrom<any>(
      this.client.send<{id: string}>(pattern, payload),
    );
    return user;
  }
}
