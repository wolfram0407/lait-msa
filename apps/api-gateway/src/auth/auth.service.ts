
import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';


import {CreateUserReqDto} from 'src/user/dto/req.auth.dto';
import {ChannelService} from 'src/channel/channel.service';
import {UserService} from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly channelService: ChannelService
  ) {
  }
  async create(createUserReqDto: CreateUserReqDto) {
    const user = await this.userService.create(createUserReqDto)
    const channel = await this.channelService.create({userId: user.userId, description: '', channelImage: user.profileImage})
    Logger.log(channel)
    return user;
  }

  async validateUser(kakaoId: string) {
    const user = await this.userService.findByKakaoId(kakaoId)
    if (!user) {
      return null;
    }
    return user;
  }

  // Access token 만료기간 2주
  async createAccessToken(id: number) {
    return await this.jwtService.signAsync({sub: id, token: "Access"}, {expiresIn: '1d'});
  }

  // refresh token 만료기간 2주
  async createRefreshToken(id: number) {
    return await this.jwtService.signAsync({sub: id, token: "Refresh"}, {expiresIn: '14d'});
  }

}

