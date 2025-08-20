# Paytm Web App (Backend)  

## 📌 Overview  
This project is a backend for a Paytm-like web application. It handles user authentication and basic setup for transactions.  

## 🚀 Features  
- User authentication (signup & login)  
- JWT-based authentication  
- Password hashing with bcrypt  
- MongoDB with Mongoose for database  
- Structured routes for clean code  
- Environment variables for sensitive data  

## 🛠 Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **bcrypt** (for password hashing)  
- **jsonwebtoken (JWT)** (for auth)  
- **cors & body-parser**  

## 📂 Project Steps Done  
1. Cloned starter repo  
2. Created Mongoose schemas  
3. Set up routing file structure  
4. Added routes for user requests  
5. Configured **cors**, **body-parser**, and **jsonwebtoken**  
6. Implemented backend authentication routes  

## 🔑 Environment Variables  
Create a `.env` file in the root with:  

```env
DBKey_URI = your-mongodb-uri
JWT_KEY = your-secret-key