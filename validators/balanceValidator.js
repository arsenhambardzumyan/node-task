const { check } = require('express-validator');

const balanceValidator = [
  check('userId').isInt(),
  check('amount').isInt().custom(value => value !== 0),
];

module.exports = balanceValidator;
