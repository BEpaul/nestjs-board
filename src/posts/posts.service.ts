import { Injectable } from '@nestjs/common';
import { PostModel, PostStatus } from './posts.model';
import { v1 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: PostModel[] = []; // 다른 컴포넌트에서 posts 배열에 접근하여 수정하는 것을 막기 위해 접근 제한

  readAllPosts(): PostModel[] {
    return this.posts;
  }

  readPostById(id: string): PostModel {
    return this.posts.find((post) => post.id === id);
  }

  createPosts(createPostDto: CreatePostDto) {
    const { title, content, author } = createPostDto;
    const time = String(new Date());

    const post: PostModel = {
      id: uuid(),
      title,
      content,
      author,
      date: time,
      status: PostStatus.PUBLIC,
    };

    this.posts.push(post);
    return post;
  }

  updatePostStatus(id: string, status: PostStatus): PostModel {
    const post = this.readPostById(id);
    post.status = status;
    return post;
  }

  deletePost(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
