import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './posts.status.enum';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  date: string;

  @Column()
  content: string;

  @Column()
  status: PostStatus;
}
