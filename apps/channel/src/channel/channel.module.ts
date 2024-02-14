import {Module} from '@nestjs/common';
import {ChannelController} from './channel.controller';
import {ChannelService} from './channel.service';
import {Channel} from './entity/channel.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
