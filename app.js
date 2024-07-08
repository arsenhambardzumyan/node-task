require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const umzug = require('./umzug');
const { updateBalance, getAllUsers } = require('./controllers/userController');
const validateInput = require('./middlewares/validateInput');

const app = express();

app.use(bodyParser.json());

app.post('/update-balance', validateInput, updateBalance);
app.get('/users', getAllUsers);

const startApp = async () => {
  try {
    await umzug.up();
    app.listen(3000, () => {
      console.log('App running on port 3000');
    });
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

startApp();
