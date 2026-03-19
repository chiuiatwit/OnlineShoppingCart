const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({ error: 'Username must be between 3 and 50 characters.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, hash]
    );
    const user = result.rows[0];
    req.session.userId = user.id;
    return res.status(201).json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'That username is already taken.' });
    }
    console.error('Register error:', err.message);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    const hash = user?.password_hash || '$2b$10$invalidhashpadding000000000000000000000000000000000000000';
    const match = await bcrypt.compare(password, hash);

    if (!user || !match) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    req.session.userId = user.id;
    return res.json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' });
    }
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, username FROM users WHERE id = $1',
      [req.session.userId]
    );

    const user = result.rows[0];
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    return res.json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error('Me error:', err.message);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
