const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const router = express.Router();

const path = require('path');

const SECRET_KEY = 'nelwey';
const usersFilePath = path.resolve(__dirname, 'data', 'users.json');

const readUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

router.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({ token, message: 'Login successful' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;
