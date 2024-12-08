import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { books, favoriteBooks, users } from 'src/database/schema';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookService {
  constructor(private readonly userService: UserService) {}
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
    if (!book.length) {
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

  async markAsFavorite(bookId: number, email: string) {
    const user = await db.select().from(users).where(eq(users.email, email));
    const book = await this.bookExist(bookId);

    if (!book.length) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }

    const isFav = await db
      .select()
      .from(favoriteBooks)
      .where(eq(favoriteBooks.bookId, bookId));

    if (isFav.length > 0) {
      throw new BadRequestException('Book is already in favorite list.');
    }
    await db
      .insert(favoriteBooks)
      .values({
        userId: user[0].id,
        bookId,
      })
      .returning();

    return 'Book added to favorite list.';
  }

  async getRecommendations() {
    const allBooks = await db.select().from(books);
    return allBooks[Math.floor(Math.random() * allBooks.length)];
  }

  async getFavoriteBooks(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const userId = user[0].id;
    const favBooks = await db
      .select()
      .from(favoriteBooks)
      .leftJoin(books, eq(favoriteBooks.bookId, books.id))
      .where(eq(favoriteBooks.userId, userId));

    const sanitizedBooks = favBooks.map((favBook) => favBook.books);

    return sanitizedBooks;
  }

  async removeFromFavorite(bookId: number) {
    const book = await db
      .select()
      .from(favoriteBooks)
      .where(eq(favoriteBooks.bookId, bookId))
      .execute();

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }

    const data = await db
      .delete(favoriteBooks)
      .where(eq(favoriteBooks.bookId, bookId))
      .returning();
    return data[0];
  }

  private async bookExist(id: number) {
    return await db.select().from(books).where(eq(books.id, id));
  }

  async getBookByISBN(isbn: string) {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.isbn, isbn))
      .execute();

    if (!book.length) {
      throw new NotFoundException(`Book with ISBN ${isbn} not found.`);
    }
    return book[0];
  }

  async getBookByTitle(title: string) {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.title, title))
      .execute();

    if (!book.length) {
      throw new NotFoundException(`Book with title ${title} not found.`);
    }
    return book[0];
  }

  async searchByAuther(author: string) {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.author, author))
      .execute();

    if (!book.length) {
      throw new NotFoundException(`Book with author ${author} not found.`);
    }
    return book[0];
  }
}
