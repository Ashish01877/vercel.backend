const Order = require('../models/Order');
const logger = require('../utilities/logger');

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    logger.info(`Order created: ${order._id}`);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders, createOrder };