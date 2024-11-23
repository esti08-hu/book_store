import { Injectable, NotFoundException } from '@nestjs/common';
import { books } from 'src/database/schema';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
  async getAllBooks() {
    return db.select().from(books);
  }

  async getBookById(id: number) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async createBook(data: CreateBookDto) {
    const newBook = db.insert(books).values(data);
    return newBook;
  }

  async updateBook(id: number, data: UpdateBookDto) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return db.update(books).set(data).where(eq(books.id, id));
  }

  async deleteBook(id: number) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return db.delete(books).where(eq(books.id, id));
  }

  private async bookExist(id: number) {
    return db.select().from(books).where(eq(books.id, id));
  }
}
