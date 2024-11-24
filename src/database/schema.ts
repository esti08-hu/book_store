import { pgTable, boolean, varchar, serial } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  isFavorite: boolean('is_favorite').notNull(),
  title: varchar('title').notNull(),
  author: varchar('author').notNull(),
  isbn: varchar('isbn').notNull(),
  publishedYear: varchar('published_year').notNull(),
});
