import { Body, Controller, Get, Post, Req, Response } from '@nestjs/common';
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
  async login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    const accessToken = await this.authService.userLogin(loginDto);

    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 15,
      httpOnly: true,
    });
    return accessToken;
  }

  @Post('admin_login')
  @Public()
  async adminLogin(
    @Body() adminLoginDto: AdminLoginDto,
    @Response({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.adminLogin(adminLoginDto);

    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 15,
      httpOnly: true,
    });
    return accessToken;
  }

  @Post('logout')
  @ApiBearerAuth()
  logout(@Response() res) {
    res.cookie('access_token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    return res.send({ message: 'Logged out successfully' });
  }

  @Get('check-cookies')
  @Public()
  async checkCookies(@Req() req) {
    return req.cookies;
  }
}
