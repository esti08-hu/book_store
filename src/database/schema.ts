import { pgTable, serial, boolean, varchar } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  author: varchar('author').notNull(),
  isbn: varchar('isbn').notNull(),
  publishedYear: varchar('published_year').notNull(),
  isFavorite: boolean('is_favorite').default(false),
});
