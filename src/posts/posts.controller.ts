import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { title } from 'process';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel, PostStatus } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  readAllPost(): PostModel[] {
    return this.postsService.readAllPosts();
  }

  @Get(':id')
  readPost(@Param('id') id: string): PostModel {
    return this.postsService.readPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): PostModel {
    return this.postsService.createPosts(createPostDto);
  }

  @Patch(':id/status')
  updatePost(@Param('id') id: string, @Body('status') status: PostStatus) {
    return this.postsService.updatePostStatus(id, status);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): void {
    this.postsService.deletePost(id);
  }
}
