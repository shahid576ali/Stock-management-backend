# Stock-management-backend

# Express.js Authentication API

A simple authentication system using Express.js with sign-up and sign-in APIs secured by JWT.

## Features

- **Sign-Up API**: Register new users.
- **Sign-In API**: Log in and get a JWT.
- **JWT Authentication**: Protect routes with tokens.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- MongoDB (optional, for user data storage)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=3000
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_uri
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Sign-Up

**POST** `/api/signup`

Request Body:
```json
{
  "username": "user",
  "email": "user@example.com",
  "password": "password"
}
```
Response: `201 Created` or `400 Bad Request`

### Sign-In

**POST** `/api/signin`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
Response:
```json
{
  "token": "your.jwt.token"
}
```

### Protected Routes

Use middleware to verify tokens:
```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
```

## Tools Used

- **Express.js**: Backend framework.
- **JWT**: Token-based authentication.
- **dotenv**: Manage environment variables.

## Author

[Subhash Kumar](https://github.com/FZRAJPUT)
