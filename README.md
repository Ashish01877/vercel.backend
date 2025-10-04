# Books4MU Backend API

A comprehensive backend API for the Books4MU bookstore application built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order management
- Data validation and error handling
- Scalable architecture with middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS for cross-origin requests

## Installation

1. Navigate to the backend directory:
   ```bash
   cd proj/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Local development
   MONGO_URI=mongodb://localhost:27017/books4mu
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000

   # Production (set these in your deployment platform)
   # MONGO_URI_PROD=your_mongodb_atlas_connection_string
   # JWT_SECRET_PROD=your_production_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Production Deployment

### Prerequisites
- MongoDB Atlas account (for cloud database)
- Render.com account (for backend deployment)

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Replace `<username>`, `<password>`, and `<database>` in the connection string

### Render Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following environment variables in Render dashboard:
   ```
   MONGO_URI_PROD=your_mongodb_atlas_connection_string
   JWT_SECRET_PROD=your_secure_random_jwt_secret
   ```
4. The PORT will be automatically set by Render
5. Deploy the service

### CORS Configuration
The backend is configured to allow requests from:
- `https://book4mu-794ca.web.app` (production frontend)
- `https://book4mu-794ca.firebaseapp.com` (Firebase preview)
- `http://localhost:5000` (local development)
- `http://127.0.0.1:5000` (local development)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires auth)

### Products

- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders

- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)
- `POST /api/orders` - Create order (requires auth)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/admin/all` - Get all orders (admin only)

## Database Schema

### User
- username: String (required, unique)
- email: String (required, unique)
- password: String (required, hashed)
- role: String (enum: 'user', 'admin', default: 'user')

### Product
- title: String (required)
- author: String (required)
- description: String
- price: Number (required, min: 0)
- originalPrice: Number (min: 0)
- category: String
- image: String (URL)
- stock: Number (default: 0, min: 0)
- inStock: Boolean (default: true)

### Order
- user: ObjectId (ref: User, required)
- items: Array of order items
- totalAmount: Number (required, min: 0)
- shippingAddress: Object
- paymentMethod: String (enum: 'cash_on_delivery')
- status: String (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')

## Authentication

Use JWT tokens for authentication. Include the token in the Authorization header as `Bearer <token>`.

## Validation

All endpoints include input validation using express-validator. Invalid requests will return a 400 status with error details.

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages.

## Scalability

- Modular route structure
- Middleware for authentication and authorization
- Input validation and sanitization
- Proper database indexing (recommended for production)

## Security

- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation and sanitization
- CORS enabled
- Admin role-based access control