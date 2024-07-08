const { check, validationResult } = require('express-validator');

const validateInput = [
  check('userId').isInt(),
  check('amount').isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateInput;
