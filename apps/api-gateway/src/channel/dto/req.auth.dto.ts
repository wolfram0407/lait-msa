
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

// 채널 생성
export class CreateChannelReqDto {

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  channelImage: string

  @IsNumber()
  @IsNotEmpty()
  userId: number
}
