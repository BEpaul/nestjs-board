import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PostStatus } from '../posts.status.enum';

export class PostStatusValdationPipe implements PipeTransform {
  readonly StatusOptions = [PostStatus.PUBLIC, PostStatus.PRIVATE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
