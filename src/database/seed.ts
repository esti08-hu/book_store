import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { books } from './schema';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const main = async () => {
  // Set up the database connection
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  const db = drizzle(pool);

  // Generate book data
  const bookData = [];
  console.log('Seeding books...');
  for (let i = 0; i < 50; i++) {
    bookData.push({
      title: faker.lorem.words({ min: 2, max: 5 }),
      author: faker.person.fullName(),
      isbn: faker.number
        .int({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      publishedYear: faker.number.int({
        min: 1900,
        max: new Date().getFullYear(),
      }),
      isFavorite: faker.datatype.boolean(),
    });
  }

  // Insert book data into the database
  await db.insert(books).values(bookData).returning();

  console.log('Books seeding completed!');
  process.exit(0);
};

// Run the seeding script
main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
