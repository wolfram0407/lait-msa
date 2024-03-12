import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateLiveReqDto {
  @ApiProperty({
    required: true,
    example: '[LIVE] 실시간 스트리밍',
    description: '라이브 제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    example: '먹방합니다.',
    description: '설명',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateLiveReqDto extends PartialType(CreateLiveReqDto) {
}
