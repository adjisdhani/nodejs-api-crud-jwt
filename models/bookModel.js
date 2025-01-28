const db = require('../utils/dbInstance');

const Book = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM books');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { title, author, published_date } = data;
    const [result] = await db.query('INSERT INTO books (title, author, published_date) VALUES (?, ?, ?)', [title, author, published_date]);
    return result.insertId;
  },
  update: async (id, data) => {
    const { title, author, published_date } = data;
    await db.query('UPDATE books SET title = ?, author = ?, published_date = ? WHERE id = ?', [title, author, published_date, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM books WHERE id = ?', [id]);
  },
};

module.exports = Book;