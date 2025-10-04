require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const logger = require('./utilities/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();




// Environment variables (production overrides)
const MONGO_URI = process.env.MONGO_URI_PROD || process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET_PROD || process.env.JWT_SECRET;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    "https://book4mu-794ca.web.app",  // your Firebase app
    "https://book4mu-794ca.firebaseapp.com", // optional (Firebase preview)
    "http://localhost:5000", // for local dev
    "http://127.0.0.1:5000" // for local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => logger.info('MongoDB connected'))
.catch(err => logger.error('MongoDB connection error:', err));

// API Routes (MUST come FIRST - before any static file serving)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// API root route for testing
app.get('/api', (req, res) => {
  res.json({
    message: 'Books4MU API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Serve static files from the proj directory (for standalone backend)
const staticPath = path.resolve(__dirname, '../');
logger.info('Serving static files from:', staticPath);

// Specific route for root path (before static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(404).send('File not found');
    }
  });
});

// Static files middleware (after API routes)
app.use(express.static(staticPath));

// Catch-all handler: send back index.html for any non-API routes (for SPA routing)
// This MUST come LAST
app.use((req, res, next) => {
  // Only serve index.html for routes that don't start with /api and don't have file extensions
  if (!req.path.startsWith('/api') && !req.path.includes('.')) {
    res.sendFile(path.join(staticPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(404).send('File not found');
      }
    });
  } else {
    next();
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
