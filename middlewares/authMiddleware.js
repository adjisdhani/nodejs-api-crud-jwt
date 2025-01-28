const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

const validateAdminCredentials = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
  if (rows.length === 0) return null;

  const admin = rows[0];
  const bcrypt = require('bcryptjs');

  const isMatch = await bcrypt.compare(password, admin.password);

  return isMatch ? admin : null;
};

module.exports = { authenticateToken, validateAdminCredentials };