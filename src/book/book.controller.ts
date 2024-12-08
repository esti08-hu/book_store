import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
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
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/permissions.enums';

@Controller('book')
@ApiTags('book')
@ApiBearerAuth()
@Roles(Role.ADMIN)
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    const data = this.bookService.getAllBooks();
    return data;
  }

  @Get('recommendations')
  @Roles(Role.USER)
  async getRecommendations() {
    const recBook = await this.bookService.getRecommendations();
    const { id, ...book } = recBook;
    return book;
  }

  @Get('favorite')
  @Roles(Role.USER)
  async getFavoriteBooks(@Req() req: any) {
    const email = req.user.email;
    const favBooks = await this.bookService.getFavoriteBooks(email);
    return favBooks;
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<BookResponseDto> {
    const data = this.bookService.getBookById(id);
    return data;
  }

  @Post()
  @Roles(Role.USER)
  async createBook(
    @Body() data: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    const Data = await this.bookService.createBook(data);
    const { id, ...newData } = Data;
    return newData;
  }

  @Delete('removeFav/:id')
  @Roles(Role.USER)
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

  @Post('favorite/:id')
  @Roles(Role.USER)
  markAsFavorite(@Param('id') bookId: number, @Req() req: any) {
    const email = req.user.email;
    return this.bookService.markAsFavorite(bookId, email);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    const data = await this.bookService.deleteBook(id);
    return data;
  }

  @Get('search/:title')
  async searchByTitle(@Param('title') title: string) {
    const data = await this.bookService.getBookByTitle(title);
    return data;
  }

  @Get('search/author/:author')
  async searchByAuthor(@Param('author') author: string) {
    const data = await this.bookService.searchByAuther(author);
    return data;
  }
}
