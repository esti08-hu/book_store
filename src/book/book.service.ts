import { Injectable, NotFoundException } from '@nestjs/common';
import { books } from 'src/database/schema';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
  async getAllBooks() {
    const allBooks = await db.select().from(books);
    const data = allBooks.map(({ id, ...data }) => data);
    return data;
  }

  async getBookById(Id: number) {
    const book = await this.bookExist(Id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${Id} not found.`);
    }
    const { id, ...data } = book[0];

    return data;
  }

  async createBook(data: CreateBookDto) {
    const newBook = db.insert(books).values(data);
    return newBook;
  }

  async updateBook(id: number, data: UpdateBookDto) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    return db.update(books).set(data).where(eq(books.id, id));
  }

  async deleteBook(id: number) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    return db.delete(books).where(eq(books.id, id));
  }

  private async bookExist(id: number) {
    return db.select().from(books).where(eq(books.id, id));
  }
}
