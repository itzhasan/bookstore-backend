const { Router} = require('express');
const controller = require('./controller');
const isAuthenticated = require('../../middleware');
const router = Router();

router.post('/add',isAuthenticated, controller.addToCart);

router.get('/viewcart',isAuthenticated, controller.viewCart);

module.exports = router;