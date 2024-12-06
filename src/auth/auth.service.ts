import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto } from './auth.dto';
import { admins, users } from 'src/database/schema';
import { db } from 'src/database/db';
import { eq } from 'drizzle-orm';
import { Role } from './permissions.enums';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(password: string, hashedPassword: string) {
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
    if (!userExists.length) {
      const [newuser] = await db
        .insert(users)
        .values({ ...data, password: hashedPassword })
        .returning();
      const { password, id, ...userData } = newuser;

      return userData;
    }
    throw new BadRequestException('User already exists');
  }

  async userLogin(data: SignupDto): Promise<any> {
    const userExists = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await this.validateUser(
      data.password,
      userExists.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const [userRecord] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
    const payload = { email: userRecord.email, role: [Role.USER] };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }

  async adminLogin(data: SignupDto): Promise<any> {
    const adminExists = await db.query.admins.findFirst({
      where: eq(admins.email, data.email),
    });
    if (!adminExists) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await this.validateUser(
      data.password,
      adminExists.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const [adminRecord] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, data.email));

    const payload = { email: adminRecord.email, role: [Role.ADMIN] };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }

  async logout(data: LoginDto): Promise<any> {
    return { message: 'Logged out successfully' };
  }
}
