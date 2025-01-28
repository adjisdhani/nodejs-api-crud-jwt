require('dotenv').config();
require('./utils/dbInstance');
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { validateAdminCredentials } = require('./middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route untuk Generate Token
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await validateAdminCredentials(username, password);
    if (admin) {
      const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials.' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
});

// Gunakan routing
app.use('/api/books', bookRoutes);
app.use('/api/admins', adminRoutes);

module.exports = app;