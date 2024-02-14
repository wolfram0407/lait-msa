import {registerAs} from '@nestjs/config';

export default registerAs('gateway', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3308,
  database: process.env.GATEWAY_DATABASE || 'lait_gateway',
  username: process.env.GATEWAY_USERNAME || 'lait_gateway',
  password: process.env.GATEWAY_PASSWORD || 'lait_gateway',
}));
