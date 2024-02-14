import {registerAs} from '@nestjs/config';

export default registerAs('kakao', () => ({
  key: process.env.KAKAO_KEY || '437f3300a4fe5d51f361f273cf18ace1',
}));
