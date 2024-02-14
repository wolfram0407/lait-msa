import {registerAs} from '@nestjs/config';

export default registerAs('channel_service', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3308,
  database: process.env.GATEWAY_DATABASE || 'channel_service',
  username: process.env.GATEWAY_USERNAME || 'channel',
  password: process.env.GATEWAY_PASSWORD || 'channel',
}));
