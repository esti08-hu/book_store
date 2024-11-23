import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateBookDto,
  CreateBookResponseDto,
  UpdateBookDto,
  UpdateBookResponseDto,
} from './book.dto';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    const data = this.bookService.getAllBooks();
    return {
      status: 200,
      data,
    };
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    const data = this.bookService.getBookById(id);
    return {
      data,
    };
  }

  @Post()
  async createBook(
    @Body() data: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    const newData = await this.bookService.createBook(data);
    return newData;
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() data: UpdateBookDto,
  ): Promise<UpdateBookResponseDto> {
    const updateData = await this.bookService.updateBook(id, data);
    return {
      data: updateData,
    };
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    const data = await this.bookService.deleteBook(id);
    return data;
  }
}
