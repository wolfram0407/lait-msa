import {Module} from '@nestjs/common';
import {LiveController} from './live.controller';
import {LiveService} from './live.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Live} from './entity/live.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Live])],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
