import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorators';

@Controller()
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<{ message: string }> {
    return this.authService.registerUser(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
   return this.authService.userLogin(loginDto);
}

@Post('logout')
async logout(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
  return this.authService.logout(loginDto);
}
}