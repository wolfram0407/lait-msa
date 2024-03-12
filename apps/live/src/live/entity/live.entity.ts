import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
@Entity({
  name: 'lives',
})
export class Live {
  @PrimaryGeneratedColumn({unsigned: true, name: 'live_id'})
  liveId: number;

  @Column({type: 'varchar', nullable: false})
  thumbnail: string;

  @Column({type: 'varchar', nullable: false})
  title: string;

  @Column({type: 'varchar'})
  description: string;

  @Column({type: 'varchar', name: 'hls_url'})
  hlsUrl: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', select: false})
  deletedAt: Date;

  @Column({name: 'channel_id'})
  channelId: number;
}
