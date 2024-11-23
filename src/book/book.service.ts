import { Injectable } from '@nestjs/common';
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
    return db.select().from(books).where(eq(books.id, id));
  }

  async createBook(data: CreateBookDto) {
    return db.insert(books).values(data);
  }

  async updateBook(id: number, data: UpdateBookDto) {
    return db.update(books).set(data).where(eq(books.id, id));
  }

  async deleteBook(id: number) {
    return db.delete(books).where(eq(books.id, id));
  }
}
