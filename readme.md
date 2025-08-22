# Paytm Web App (Backend)  

## 📌 Overview  
This project is a complete backend for a Paytm-like web application. It handles user authentication, account management, and money transfer functionality with secure transactions.

## 🚀 Features  
- **User Authentication**
  - User registration (signup) with email validation
  - User login (signin) with JWT token generation
  - Password hashing with bcrypt for security
  - JWT-based authentication middleware

- **User Management**
  - Update user profile (first name, last name, password)
  - Search users with filtering capability
  - Secure password updates with hashing

- **Account Management**
  - Automatic account creation on user signup
  - Check account balance
  - Secure money transfer between accounts
  - Transaction validation and error handling

- **Security Features**
  - Input validation using Zod schemas
  - MongoDB transactions for data consistency
  - ObjectId validation for database queries
  - Self-transfer prevention
  - Comprehensive error handling

## 🛠 Tech Stack  
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database and ODM
- **bcrypt** - Password hashing
- **jsonwebtoken (JWT)** - Authentication tokens
- **Zod** - Input validation and schema validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📂 Project Structure
```
backend/
├── db.js                 # Database connection and schemas
├── index.js              # Main server file
├── middlewares/
│   └── userMiddleware.js # JWT authentication middleware
├── routes/
│   ├── user.js          # User authentication and management routes
│   └── account.js       # Account and transfer routes
└── package.json
```

## 🔌 API Endpoints

### User Routes (`/api/v1/user`)

#### POST `/signup`
Create a new user account
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/signin`
User login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### PUT `/update`
Update user profile (requires authentication)
```json
{
  "updated_first_name": "Jane",
  "updated_last_name": "Smith",
  "new_password": "newpassword123"
}
```

#### GET `/getUsers`
Get all users with optional filtering (requires authentication)
```
GET /api/v1/user/getUsers?filter=john
```

### Account Routes (`/api/v1/account`)

#### GET `/getBalance`
Get current account balance (requires authentication)

#### POST `/transfer`
Transfer money to another account (requires authentication)
```json
{
  "transferTo": "user_id_here",
  "transferAmount": 1000
}
```

## 🔑 Environment Variables  
Create a `.env` file in the backend directory with:  

```env
DBKey_URI = your-mongodb-connection-string
JWT_KEY = your-jwt-secret-key
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up Environment Variables**
   - Create `.env` file with your MongoDB URI and JWT secret

3. **Start the Server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

## 🔒 Security Features

- **Password Security**: All passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs validated using Zod schemas
- **Database Transactions**: Money transfers use MongoDB transactions for consistency
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

## 📝 Database Schemas

### User Schema
- `firstName` (String, required)
- `lastName` (String, required) 
- `email` (String, required, unique, lowercase)
- `password` (String, required, min 6 characters)

### Account Schema
- `userId` (ObjectId, reference to User, required)
- `balance` (Number, required, min 0)

## 🔄 Transaction Flow

1. **User Registration**: Creates user and account with random balance
2. **Money Transfer**: 
   - Validates sender has sufficient balance
   - Validates recipient account exists
   - Uses MongoDB transactions for atomicity
   - Updates both account balances
   - Prevents self-transfers

## 🐛 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid token)
- `404` - Not Found (account not found)
- `411` - Authentication errors
- `500` - Internal Server Error