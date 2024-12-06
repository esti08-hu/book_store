import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  BookResponseDto,
  CreateBookDto,
  CreateBookResponseDto,
  UpdateBookDto,
  UpdateBookResponseDto,
} from './book.dto';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('book')
@ApiTags('book')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @UseGuards(new RoleGuard(['admin']))
  @Get()
  async getAllBooks() {
    console.log("object");
    const data = this.bookService.getAllBooks();
    return data;
  }

  @Get('recommendations')
  async getRecommendations() {
    const recBook = await this.bookService.getRecommendations();
    const { id, ...book } = recBook;
    return book;
  }

  @Get('favorite')
  async getFavoriteBooks() {
    const favBooks = await this.bookService.getFavoriteBooks();
    return favBooks;
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<BookResponseDto> {
    const data = this.bookService.getBookById(id);
    return data;
  }

  @Post()
  async createBook(
    @Body() data: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    const Data = await this.bookService.createBook(data);
    const { id, ...newData } = Data;
    return newData;
  }

  @Put('removeFav/:id')
  async removeFromFavorite(@Param('id') id: number) {
    return this.bookService.removeFromFavorite(id);
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

  @Put('favorite/:id')
  markAsFavorite(@Param('id') id: number) {
    return this.bookService.markAsFavorite(id);
  }
}
