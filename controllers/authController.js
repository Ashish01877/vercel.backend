const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utilities/logger');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Basic registration logic
    const user = new User({ email, password });
    await user.save();
    logger.info(`User registered: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    logger.info(`User logged in: ${email}`);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };