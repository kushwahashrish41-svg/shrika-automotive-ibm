# Shrika Automotive 🚗

A full-stack automotive e-commerce web application developed as part of
an IBM Web Development Internship project.

## Features

### Customer

-   User registration and login
-   JWT authentication
-   Browse automotive products
-   Search and category filtering
-   Add, update and remove cart items
-   Place orders
-   View order history
-   Logout

### Admin

-   Admin authentication
-   View customer orders
-   View customer contact and delivery details
-   View products, totals and order status

## Technologies

-   **Frontend:** React, Vite, JavaScript, HTML/CSS
-   **Backend:** Node.js, Express.js, REST APIs, JWT
-   **Database:** MongoDB, Mongoose
-   **Tools:** Git, GitHub, GitHub Desktop, VS Code

## Project Structure

``` text
shrika-automotive-ibm/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── admin.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
├── .gitignore
├── .gitattributes
└── README.md
```

## Setup

### 1. Clone

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd shrika-automotive-ibm
```

### 2. Backend

``` bash
cd backend
npm install
```

Create `backend/.env` using `.env.example`:

``` env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Start the backend:

``` bash
npm start
```

Backend: `http://localhost:5000`

### 3. Frontend

Open a second terminal:

``` bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally
`http://localhost:5173`.

## Application Flow

``` text
React Frontend
      ↓
HTTP / REST API
      ↓
Node.js + Express
      ↓
Mongoose
      ↓
MongoDB
      ↓
Response to React
```

## Testing Checklist

-   Register
-   Login
-   Browse/search/filter products
-   Add and manage cart
-   Place an order
-   Check order history
-   Logout
-   Login as admin
-   Open Admin Orders
-   Verify customer/order details
-   Confirm frontend and backend run without errors

## Security

Never commit the real `.env` file, MongoDB credentials, or JWT secret.
Keep only `.env.example` in GitHub.

## Project Purpose

This project demonstrates React frontend development, REST API
integration, authentication, MongoDB database operations, e-commerce
cart/order functionality, admin functionality, and Git/GitHub version
control.

**Project:** Shrika Automotive\
**Purpose:** IBM Web Development Internship
