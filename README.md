
# 📚 Book Store API

Welcome to the **Book Store API**! This project is a backend service built with **NestJS**, **Drizzle ORM**, and **PostgreSQL**, designed to manage a collection of books. 🌟 Explore features like book management, favorites, and recommendations. 🚀

---

## 🛠 Features

- 📖 **Book Management**: Add, update, view, and delete books.
- 🌟 **Favorites**: Mark or remove books as favorites.
- 🎲 **Recommendations**: Get random book recommendations.
- ✅ **Validation**: Strict input validation with DTOs.
- 📄 **Swagger Integration**: Easy-to-use API documentation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- Render account for deployment

---

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/esti08-hu/book-store-api.git
cd book-store-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the file with your PostgreSQL and Render credentials:

```env
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
```

---

## 🛠 Usage

### Run Locally

1. **Migrate the database:**

   ```bash
   npm run migrate
   ```

2. **Seed the database:**

   ```bash
   npm run seed
   ```

3. **Start the development server:**

   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

---

## 🌐 Deployment on Render

1. Log in to [Render](https://render.com/).
2. Create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the **Build Command** to:
   ```bash
   npm install && npm run build
   ```
5. Set the **Start Command** to:
   ```bash
   npm run start:prod
   ```
6. Add the required environment variables in the **Environment** section of Render.
7. Deploy your app! 🎉

Your app will be live on a Render-generated URL.

---

## 📄 API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/book`               | Get all books               |
| GET    | `/book/:id`           | Get a book by ID            |
| POST   | `/book`               | Create a new book           |
| PUT    | `/book/:id`           | Update an existing book     |
| DELETE | `/book/:id`           | Delete a book               |
| POST   | `/book/favorite/:id`  | Mark a book as favorite     |
| DELETE | `/book/favorite/:id`  | Remove a book from favorite |
| GET    | `/book/recommendations` | Get a random recommendation |

---

## 📦 Features

- **Random Recommendations**: Get a random book with `/book/recommendations`.
- **Favorites Management**: Mark or unmark books as favorites.
- **Swagger UI**: Accessible at `/api` for testing endpoints.

---

## 📝 License

This project is licensed under the **MIT License**. 📜

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/esti08-hu/your-/book-store-api/issues).

---

## 📧 Contact

For questions or suggestions, email **estioame@gmail.com**.  

---

Happy Coding! 🎉