const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books.' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.getById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book.' });
  }
};

const createBook = async (req, res) => {
  try {
    const newBookId = await Book.create(req.body);
    res.status(201).json({ message: 'Book created.', id: newBookId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book.' });
  }
};

const updateBook = async (req, res) => {
  try {
    await Book.update(req.params.id, req.body);
    res.json({ message: 'Book updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book.' });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.delete(req.params.id);
    res.json({ message: 'Book deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book.' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };