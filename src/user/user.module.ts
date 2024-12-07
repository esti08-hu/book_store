import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BookService } from 'src/book/book.service';

@Module({
  providers: [UserService, JwtService, AuthService, BookService],
  exports: [UserService],
})
export class UserModule {}
