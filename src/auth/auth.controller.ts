import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto, LoginDto, SignupDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorators';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<{ message: string }> {
    return this.authService.registerUser(signupDto);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin_login')
  @Public()
  async adminLogin(
    @Body() adminLoginDto: AdminLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.adminLogin(adminLoginDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  async logout(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.logout(loginDto);
  }
}
