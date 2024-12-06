import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto } from './auth.dto';
import { users } from 'src/database/schema';
import { db } from 'src/database/db';
import { eq } from 'drizzle-orm';
import { Role } from './permissions.enums';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    console.log(password, hashedPassword);
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(user: any): string {
    const payload = { email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async registerUser(data: SignupDto): Promise<any> {
    const hashedPassword = await this.hashPassword(data.password);
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
    if (userExists.length) {
      const [newuser] = await db
        .insert(users)
        .values({ ...data, password: hashedPassword })
        .returning();
      return newuser;
    }
    throw new BadRequestException('User already exists');
  }

  async userLogin(data: SignupDto): Promise<any> {
    const userExists = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });
    const isPasswordValid = await this.validateUser(
      data.password,
      userExists.password,
    );
    console.log(userExists.password, data.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const [userRecord] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
    const payload = { email: userRecord.email, role: [Role.USER] };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async logout(data: LoginDto): Promise<any> {
    return { message: 'Logged out successfully' };
  }
}
