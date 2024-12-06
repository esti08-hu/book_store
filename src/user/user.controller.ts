import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorators';
import { BookService } from 'src/book/book.service';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  @Get(':email')
  @Public()
  async findByEmail(@Param('email') email: string): Promise<any> {
    return this.userService.findByEmail(email);
  }
}
