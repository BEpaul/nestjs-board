import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { title } from 'process';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatusValdationPipe } from './pipes/post-status-validation.pipe';
import { PostStatus } from './posts.status.enum';
import { PostsService } from './posts.service';
import { Posts } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // @Get()
  // readAllPost(): PostModel[] {
  //   return this.postsService.readAllPosts();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.createPost(createPostDto);
  }

  @Get('/:id')
  readPost(@Param('id') id: number): Promise<Posts> {
    return this.postsService.readPostById(id);
  }

  // @Get(':id')
  // readPost(@Param('id') id: string): PostModel {
  //   return this.postsService.readPostById(id);
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createPost(@Body() createPostDto: CreatePostDto): PostModel {
  //   return this.postsService.createPosts(createPostDto);
  // }
  // @Patch(':id/status')
  // updatePost(
  //   @Param('id') id: string,
  //   @Body('status', PostStatusValdationPipe) status: PostStatus,
  // ) {
  //   return this.postsService.updatePostStatus(id, status);
  // }
  // @Delete(':id')
  // deletePost(@Param('id') id: string): void {
  //   this.postsService.deletePost(id);
  // }
}
