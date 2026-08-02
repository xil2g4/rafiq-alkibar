const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const users = {};

router.post('/register', [body('email').isEmail(), body('password').isLength({min:6})], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name } = req.body;
  if (users[email]) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { id: Date.now(), email, name: name || 'User', password: hashedPassword };

  const token = jwt.sign({ id: users[email].id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ message: 'Registered', token, user: { id: users[email].id, email, name: users[email].name } });
});

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Logged in', token, user: { id: user.id, email, name: user.name } });
});

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch { res.status(401).json({ valid: false }); }
});

module.exports = router;