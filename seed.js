require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    title: 'Engineering Drawing',
    author: 'N. D. Bhatt',
    description: 'Engineering Drawing by Prof. N. D. Bhatt is suggested as textbook for studying the following subjects: Engineering Drawing in Computer Engineering Semester 3 (Mumbai University)',
    price: 15.99,
    originalPrice: 20.99,
    category: 'Engineering',
    image: 'image/book-1.png',
    stock: 50,
    inStock: true,
  },
  {
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    description: 'Comprehensive guide to software engineering principles and practices.',
    price: 15.99,
    originalPrice: 20.99,
    category: 'Engineering',
    image: 'image/book-2.png',
    stock: 30,
    inStock: true,
  },
  {
    title: 'Engineering Mathematics-1',
    author: 'B.S. Grewal',
    description: 'Essential mathematics for engineering students.',
    price: 15.99,
    originalPrice: 20.99,
    category: 'Mathematics',
    image: 'image/book-3.png',
    stock: 1,
    inStock: false,
  },
  {
    title: 'Data Structures and Algorithms',
    author: 'Cormen',
    description: 'Fundamental concepts of data structures and algorithms.',
    price: 18.99,
    originalPrice: 25.99,
    category: 'Computer Science',
    image: 'image/book-4.png',
    stock: 40,
    inStock: true,
  },
  {
    title: 'Database System Concepts',
    author: 'Silberschatz',
    description: 'Comprehensive coverage of database systems.',
    price: 22.99,
    originalPrice: 30.99,
    category: 'Computer Science',
    image: 'image/book-5.png',
    stock: 25,
    inStock: true,
  },
  {
    title: 'Operating Systems',
    author: 'Galvin',
    description: 'Principles of operating systems design and implementation.',
    price: 19.99,
    originalPrice: 26.99,
    category: 'Computer Science',
    image: 'image/book-6.png',
    stock: 35,
    inStock: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany(); // Clear existing products
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();