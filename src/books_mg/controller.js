const pool = require("../../db");
const queries = require('./query')
const bodyParser = require('body-parser');

const getBooks =async (req,res)=>{
  try {
    const { limit = 10, offset = 0 } = req.query;
    const queryText = queries.getBooks;
    const { rows } = await pool.query(queryText, [limit, offset]);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  }

  const addBook = async (req, res) => {
    const { title, author, gener, price, available } = req.body;
  
    try {
      //validation
      if (!title || !author || !gener || !price || !available) {
        return res.status(400).send('Missing required fields');
      }
      const result = await pool.query(
        queries.addbook,
        [title, author, gener, price, available]
      );
  
      const insertedBook = result.rows[0];
      res.status(201).json(insertedBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).send('Error adding book');
    }
  };

  const editbook =async (req, res) => {
    const id = req.params.id;
    const { title, author, gener, price, available } = req.body;
  
    try {
      const result = await pool.query(queries.editbook, [title, author, gener, price, available, id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book updated successfully', book: result.rows[0] });
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Failed to update book' });
    }
  }

 const deleteBook = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.query(queries.deletebook, [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Failed to delete book' });
    }
  }

module.exports={
    getBooks,
    addBook,
    deleteBook,
    editbook

};