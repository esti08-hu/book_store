import {
  pgTable,
  varchar,
  serial,
  // primaryKey,
  integer,
} from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  author: varchar('author').notNull(),
  isbn: varchar('isbn').notNull(),
  publishedYear: varchar('published_year').notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  role: varchar('role').default('USER'),
});

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  role: varchar('role').default('ADMIN'),
  password: varchar('password').notNull(),
});

export const favoriteBooks = pgTable('favorite_books', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  bookId: integer('book_id')
    .notNull()
    .references(() => books.id),
});
