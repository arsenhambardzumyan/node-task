const User = require('../models/user');
const sequelize = require('../sequelize');

const updateUserBalance = async (userId, amount) => {
  try {
    let updatedUser;

    // Begin a transaction
    await sequelize.transaction(async (t) => {
      // Find the user by userId and lock the row for update
      const user = await User.findByPk(userId, { transaction: t, lock: true });
      if (!user) {
        throw new Error('User not found');
      }

      // Check if sufficient balance is available
      if (user.balance < amount) {
        throw new Error('Insufficient funds');
      }

      // Deduct amount from the user's balance
      user.balance -= amount;
      updatedUser = await user.save({ transaction: t });

      // Log the updated balance
      console.log(`User ${userId} balance updated to: ${updatedUser.balance}`);

      // Simulate some delay to test concurrency
      await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay as needed
    });

    // If the transaction is successful, return true or any meaningful data
    return true;
  } catch (error) {
    // Handle transaction errors
    console.error('Transaction failed:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

module.exports = { updateUserBalance };
