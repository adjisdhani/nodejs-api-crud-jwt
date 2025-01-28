const Admin = require('../models/adminModel');

const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const newAdminId = await Admin.create(username, password);
    res.status(201).json({ message: 'Admin created successfully.', id: newAdminId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin.', error: error.message });
  }
};

module.exports = { createAdmin };