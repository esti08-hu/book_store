import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BookModule } from 'src/book/book.module';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

@Module({
  imports: [UserModule, BookModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class AuthModule {}
