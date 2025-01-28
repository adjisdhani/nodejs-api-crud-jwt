const express = require('express');
const { createAdmin } = require('../controllers/adminController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Hanya admin yang bisa menambahkan admin baru
router.post('/', authenticateToken, createAdmin);

module.exports = router;