import {IsNotEmpty, IsString} from "class-validator";

// 회원가입
export class CreateUserReqDto {
  @IsNotEmpty()
  kakaoId: string

  @IsNotEmpty()
  @IsString()
  nickname: string

  @IsString()
  @IsNotEmpty()
  profileImage: string

  @IsString()
  @IsNotEmpty()
  provider: string
}
