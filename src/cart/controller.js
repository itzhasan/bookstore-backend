const pool = require("../../db");
const queries = require('./query')


const addToCart = async (req, res) => {
    const { email, book_id, quantity } = req.body;
    try {
      // check user
      const user = await pool.query(queries.getUser, [email]);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user_id = user.rows[0].id;
  
      // Add book to cart
      const result = await pool.query(
        queries.addToCart,
        [user_id, book_id, quantity]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error adding book to cart', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const viewCart = async (req, res) => {
    const { email } = req.body;
    try {
      // find user cart
      const user = await pool.query(queries.getId, [email]);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user_id = user.rows[0].id;
  
      // get cart contents
      const result = await pool.query(
        queries.getCartContent,
        [user_id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching cart contents', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports={
    addToCart,
    viewCart
}