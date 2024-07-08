require('dotenv').config();
const User = require('./models/user'); // Adjust path as per your project structure
const sequelize = require('./sequelize'); // Ensure this is correctly imported

const showUsers = async () => {

  try {
    // Synchronize all defined models to the DB and create the missing ones
    await sequelize.sync();

    // Fetch all users from the 'users' table
    const users = await User.findAll();

    // Output each user's details
    users.forEach(user => {
      console.log(`User ID: ${user.id}, Balance: ${user.balance}, Created At: ${user.createdAt}`);
    });

    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    await sequelize.close(); // Ensure to close the Sequelize connection
  }
};

showUsers();
