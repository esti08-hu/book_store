import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user01' })
  name: string;
  @ApiProperty({ example: 'example@mail.com' })
  email: string;
  @ApiProperty({ example: '123' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user01' })
  name: string;
  @ApiProperty({ example: 'example@mail.com' })
  email: string;
  @ApiProperty({ example: '123' })
  password: string;
}
