"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.books = (0, pg_core_1.pgTable)('books', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    author: (0, pg_core_1.varchar)('author').notNull(),
    isbn: (0, pg_core_1.varchar)('isbn').notNull(),
    publishedYear: (0, pg_core_1.varchar)('published_year').notNull(),
    isFavorite: (0, pg_core_1.boolean)('is_favorite').default(false),
});
//# sourceMappingURL=schema.js.map