const Admin = {
  create: async (username, password) => {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return result.insertId;
  },
};

module.exports = Admin;