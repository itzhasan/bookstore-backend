const pool = require("../../db");
const queries = require('./query')
const bodyParser = require('body-parser');

const search = async (req, res) => {
    const { q } = req.query;
    try {
      const result = await pool.query(
        queries.search,
        [`%${q}%`]
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  //http://localhost:8000/books/search?q=l

  const filter = async (req, res) => {
    const { gener } = req.query;
    try {
      const result = await pool.query(queries.gener, [gener]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  //GET http://localhost:3000/filter?genre=desired_genre


  module.exports={
    search,
    filter
  }
  