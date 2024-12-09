import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { books, users, admins } from './schema'; // Import all the tables
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
    ssl: true,
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

  // Generate user data
  const userData = [];
  console.log('Seeding users...');
  for (let i = 0; i < 50; i++) {
    userData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      role: 'USER', // Default role for users
    });
  }

  // Insert user data into the database
  await db.insert(users).values(userData).returning();

  console.log('Users seeding completed!');

  // Generate admin data
  // const adminData = [];
  // console.log('Seeding admins...');
  // for (let i = 0; i < 10; i++) {
  //   adminData.push({
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     role: 'ADMIN', // Default role for admins
  //   });
  // }

  // // Insert admin data into the database
  // await db.insert(admins).values(adminData).returning();

  // console.log('Admins seeding completed!');

  process.exit(0);
};

// Run the seeding script
main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
