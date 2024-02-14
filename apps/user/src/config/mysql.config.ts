import {registerAs} from '@nestjs/config';

export default registerAs('user_service', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3308,
  database: process.env.GATEWAY_DATABASE || 'user_service',
  username: process.env.GATEWAY_USERNAME || 'user_service',
  password: process.env.GATEWAY_PASSWORD || 'user_service',
}));
