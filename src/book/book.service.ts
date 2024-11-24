import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { books } from 'src/database/schema';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
  async getAllBooks() {
    const allBooks = await db.select().from(books);
    if (!allBooks) {
      throw new NotFoundException('No books found.');
    }
    const data = allBooks.map(({ id, ...data }) => data);
    return data;
  }

  async getBookById(bookId: number) {
    const book = await this.bookExist(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }
    const { id, ...data } = book[0];

    return data;
  }

  async createBook(data: CreateBookDto) {
    const bookExist = await db
      .select()
      .from(books)
      .where(eq(books.isbn, data.isbn));

    if (bookExist[0]) {
      throw new BadRequestException(
        `Book with ${data.isbn} ISBN already exists.`,
      );
    }
    const newBook = await db.insert(books).values(data).returning();
    return newBook[0];
  }

  async updateBook(bookId: number, data: UpdateBookDto) {
    const book = await this.bookExist(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }
    const updateBook = await db
      .update(books)
      .set(data)
      .where(eq(books.id, bookId))
      .returning();

    const { id, ...bookData } = updateBook[0];
    return bookData;
  }

  async deleteBook(id: number) {
    const book = await this.bookExist(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    const data = await db.delete(books).where(eq(books.id, id)).returning();
    return data[0];
  }

  async markAsFavorite(bookId: number) {
    const favBook = await db
      .update(books)
      .set({ isFavorite: true })
      .where(eq(books.id, bookId))
      .returning();

    const { id, ...data } = favBook[0];
    return data;
  }

  async getRecommendations() {
    const allBooks = await db.select().from(books);
    return allBooks[Math.floor(Math.random() * allBooks.length)];
  }

  async getFavoriteBooks() {
    const favBooks = await db
      .select()
      .from(books)
      .where(eq(books.isFavorite, true));

    if (!favBooks) {
      throw new NotFoundException('No favorite books found.');
    }
    const data = favBooks.map(({ id, ...data }) => data);
    return data;
  }

  async removeFromFavorite(bookId: number) {
    const book = await this.bookExist(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }

    const updatedBook = await db
      .update(books)
      .set({ isFavorite: false })
      .where(eq(books.id, bookId))
      .returning();

    const { id, ...data } = updatedBook[0];
    return data;
  }

  private async bookExist(id: number) {
    return db.select().from(books).where(eq(books.id, id));
  }
}
