const { updateUserBalance } = require('../services/userService');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/user');

const updateBalance = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    // Log the current balance before update
    const userBeforeUpdate = await User.findByPk(userId);
    if (!userBeforeUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`User ${userId} balance before update: ${userBeforeUpdate.balance}`);

    // Update the balance
    const success = await updateUserBalance(userId, amount);

    // Log the current balance after update
    const userAfterUpdate = await User.findByPk(userId);
    console.log(`User ${userId} balance after update: ${userAfterUpdate.balance}`);

    res.status(200).json({ success: true, message: 'Balance deducted successfully' });
  } catch (error) {
    errorHandler(error, res); // Handle errors appropriately
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { updateBalance ,getAllUsers};
