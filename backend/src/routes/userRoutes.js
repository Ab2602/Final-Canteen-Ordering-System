const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query('SELECT id, username FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = result.rows[0];
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/changepassword', authenticateToken, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.id;

    const hashedPassword = await bcrypt.hashPassword(newPassword);

    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;