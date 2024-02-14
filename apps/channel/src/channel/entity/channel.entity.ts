import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';


@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn({name: 'channel_id', unsigned: true})
  channelId: number;

  @Column({name: 'channel_name', nullable: true, default: ' '})
  channelName: string;

  @Column({nullable: true})
  description: string;

  @Column({name: 'profile_image', nullable: true})
  channelImage: string;

  @Column({name: 'steam_key', nullable: true})
  streamKey: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date;

  @Column()
  userId: number;
}
