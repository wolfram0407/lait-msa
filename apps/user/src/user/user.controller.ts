import {Controller, Get, Logger} from '@nestjs/common';
import {UserService} from './user.service';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  // login 시 유저 정보 확인
  @MessagePattern({cmd: 'findByKakaoId'})
  async findUserIdByUser(userId: string) {
    const user = await this.userService.findByKakaoId(userId)
    return user
  }

  // 회원없는 경우 회원가입 진행
  @MessagePattern({cmd: 'create'})
  async createUser({kakaoId, nickname, profileImage, provider}: {kakaoId: string, nickname: string, profileImage: string, provider: string}) {
    const user = await this.userService.create({kakaoId, nickname, profileImage, provider})

    return user;
  }

}