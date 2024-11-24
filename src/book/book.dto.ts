import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Name' })
  @IsString()
  author: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  isbn: string;

  @ApiProperty({ example: '2021' })
  @IsString()
  publishedYear: string;
}

export class CreateBookResponseDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsString()
  publishedYear: string;
}

export class BookResponseDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsString()
  publishedYear: string;
}

export class UpdateBookDto {
  @ApiProperty({ example: 'Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Name' })
  @IsString()
  author: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  isbn: string;

  @ApiProperty({ example: '2021' })
  @IsString()
  publishedYear: string;
}

export class UpdateBookResponseDto {
  data: UpdateBookDto;
}
