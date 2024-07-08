const errorHandler = (error, res) => {
  if (error.message === 'User not found') {
    return res.status(404).json({ error: error.message });
  } else if (error.message === 'Insufficient funds') {
    return res.status(400).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = errorHandler;
