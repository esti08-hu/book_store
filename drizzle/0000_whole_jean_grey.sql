CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"title" varchar NOT NULL,
	"author" varchar NOT NULL,
	"isbn" varchar NOT NULL,
	"published_year" varchar NOT NULL
);
