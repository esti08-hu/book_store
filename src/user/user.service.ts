import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { db } from '../database/db';
import { users } from 'src/database/schema';
import { SignupDto } from 'src/auth/auth.dto';
import { eq } from 'drizzle-orm';
import { UserResponseDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { password, id, ...userData } = user;
    return userData;
  }
}
