import { Injectable, NotFoundException } from '@nestjs/common';
import { PostStatus } from './posts.status.enum';
import { v1 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}
  // readAllPosts(): PostModel[] {
  //   return this.posts;
  // }

  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { title, content, author } = createPostDto;
    const time = String(new Date());
    const post = this.postRepository.create({
      title,
      content,
      author,
      date: time,
      status: PostStatus.PUBLIC,
    });

    await this.postRepository.save(post);
    return post;
  }

  async readPostById(id: number): Promise<Posts> {
    const found = await this.postRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }

    return found;
  }

  // readPostById(id: string): PostModel {
  //   const found = this.posts.find((post) => post.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find post with id ${id}`);
  //   }
  //   return found;
  // }

  // createPosts(createPostDto: CreatePostDto) {
  //   const { title, content, author } = createPostDto;
  //   const time = String(new Date());
  //   const post: PostModel = {
  //     id: uuid(),
  //     title,
  //     content,
  //     author,
  //     date: time,
  //     status: PostStatus.PUBLIC,
  //   };
  //   this.posts.push(post);
  //   return post;
  // }

  // updatePostStatus(id: string, status: PostStatus): PostModel {
  //   const post = this.readPostById(id);
  //   post.status = status;
  //   return post;
  // }
  // deletePost(id: string): void {
  //   const found = this.readPostById(id);
  //   this.posts = this.posts.filter((post) => post.id !== found.id);
  // }
}
