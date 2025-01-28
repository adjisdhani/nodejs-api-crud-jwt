# Node.js API CRUD with JWT Authentication

This project is a RESTful API built with Node.js, Express, and MySQL. It includes JWT-based authentication and demonstrates the use of an MVC structure for better code organization.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **MySQL**
- **npm** (Node Package Manager)

## Installation Steps

Follow these steps to set up the project:

### 1. Clone the Repository
```bash
git clone https://github.com/adjisdhani/nodejs-api-crud-jwt.git
```

### 2. Navigate to the Project Directory
```bash
cd nodejs-api-crud-jwt
```

### 3. Install Dependencies
Install the required dependencies by running:
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nodejs_api
DB_PORT=3306
PORT=3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```
- Replace `DB_USER`, `DB_PASSWORD`, and `DB_NAME` with your MySQL credentials.
- Replace `JWT_SECRET` with your own secret key for JWT.

### 5. Create the Database and Tables
Login to your MySQL database and run the following commands to create the database and necessary tables:

```sql
CREATE DATABASE nodejs_api;
USE nodejs_api;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date DATE NOT NULL
);

INSERT INTO admins (username, password) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere');
```
- Replace `'$2b$10$YourHashedPasswordHere'` with a hashed password generated using bcrypt.

### 6. Run the Development Server
Start the server using:
```bash
npm run dev
```
The server will run at `http://localhost:3000` by default.

---

## API Endpoints

### Authentication

#### Login
- **URL:** `POST /api/v1/login`
- **Description:** Generate a JWT token by logging in as an admin.
- **Body Parameters:**
  ```json
  {
    "username": "admin",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token_here>"
  }
  ```

### Books

#### Get All Books
- **URL:** `GET /api/v1/books`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token_here>"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "published_date": "2023-01-01"
    }
  ]
  ```

#### Add a New Book
- **URL:** `POST /api/v1/books`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token_here>"
  }
  ```
- **Body Parameters:**
  ```json
  {
    "title": "New Book Title",
    "author": "Author Name",
    "published_date": "2023-01-01"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Book added successfully"
  }
  ```

#### Update a Book
- **URL:** `PUT /api/v1/books/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token_here>"
  }
  ```
- **Body Parameters:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "published_date": "2024-01-01"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Book updated successfully"
  }
  ```

#### Delete a Book
- **URL:** `DELETE /api/v1/books/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token_here>"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

---

## Testing the API

You can test the API using tools like **Postman** or **cURL**.

### Using Postman
1. Open Postman and create a new request.
2. Set the request method (e.g., GET, POST) and the URL (e.g., `http://localhost:3000/api/v1/books`).
3. For routes that require authentication, add an `Authorization` header:
   - Key: `Authorization`
   - Value: `Bearer <your_jwt_token>`
4. Provide request body data in JSON format where required (e.g., for adding or updating books).
5. Send the request and verify the response.

---

## Notes

- Ensure the database is running before starting the server.
- Use `bcrypt` to hash admin passwords before inserting them into the database.
- JWT tokens are required for all routes except `/api/v1/login`.

---

## License
This project is open-source and available under the [MIT License](LICENSE).