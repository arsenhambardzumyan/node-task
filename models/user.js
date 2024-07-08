const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 10000,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true, 
});

module.exports = User;
