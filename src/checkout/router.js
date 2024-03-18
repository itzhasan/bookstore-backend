const { Router} = require('express');
const controller = require('./controller');
const isAuthenticated = require('../../middleware');
const router = Router();

// Create order
router.post('/create',isAuthenticated, controller.checkout);

//   {
//     "user_id": 5,
//     "items": [
//       { "book_id": 1, "quantity": 2 },
//       { "book_id": 2, "quantity": 1 }
//     ],
//     "total_amount": 50.00,
//     "shipping_address": "123 Main St, City, Country"
//   }
  
  module.exports = router;