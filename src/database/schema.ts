import { pgTable, boolean, varchar, serial } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  isFavorite: boolean('is_favorite').notNull(),
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
