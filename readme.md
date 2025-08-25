# Paytm Clone - MERN Stack

A simple money transfer application built with React, Express.js, Node.js, and MongoDB.

## Features

- **User Authentication** - Sign up and sign in with JWT tokens
- **Dashboard** - View account balance and user list
- **Money Transfer** - Send money to other users securely
- **Real-time Balance** - Check your current balance
- **User Search** - Find users to transfer money to

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- Zod (validation)

## Quick Start

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# DBKey_URI=your_mongodb_connection_string
# JWT_KEY=your_jwt_secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/signin` - User login
- `GET /api/v1/user/getUsers` - Get all users
- `GET /api/v1/account/getBalance` - Check balance
- `POST /api/v1/account/transfer` - Transfer money

## Project Structure
```
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── middlewares/
│   └── routes/
└── frontend/
    ├── src/
    │   ├── components/
    │   └── Routes/
    └── package.json

---

Built with ❤️ using MERN stack