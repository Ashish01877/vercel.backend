const Product = require('../models/Product');
const logger = require('../utilities/logger');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    logger.info(`Product created: ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct };