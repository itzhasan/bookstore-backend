const pool = require("../../db");
const queries = require('./query')


const checkout = async (req, res) => {
    const { user_id, items, total_amount, shipping_address } = req.body;
    let client;
    try {
      client = await pool.connect();
      await client.query('BEGIN');
  
      // Create order
      const orderResult = await client.query(
        queries.createOrder,
        [user_id, total_amount, shipping_address]
      );
      const orderId = orderResult.rows[0].id;
  
      // Create order items
      for (const item of items) {
        await client.query(
          queries.orderItems,
          [orderId, item.book_id, item.quantity]
        );
      }
  
      // Update book availability 
      for (const item of items) {
        await client.query(
          queries.bookAvailable,
          [item.quantity, item.book_id]
        );
      }
  
      await client.query('COMMIT');
      res.json({ message: 'Order placed successfully' });
    } catch (error) {
      if (client) await client.query('ROLLBACK');
      console.error('Error placing order', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      if (client) client.release();
    }
  }

  module.exports={
    checkout
  }