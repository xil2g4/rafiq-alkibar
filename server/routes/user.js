const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, name: req.user.name || 'User' });
});

router.put('/profile', authenticate, (req, res) => {
  const { name } = req.body;
  res.json({ message: 'Profile updated', user: { id: req.user.id, email: req.user.email, name } });
});

module.exports = router;