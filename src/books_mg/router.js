const { Router} = require('express');
const booksController = require('./controller');
const isAuthenticated = require('../../middleware');
const searchandfilter= require('./searchandfilter');


const router = Router();

router.get('/getbooks',isAuthenticated,booksController.getBooks);
//http://localhost:8000/books/getbooks?limit=9&offset=0
router.post('/addbook',isAuthenticated,booksController.addBook);
router.put('/editbook/:id',isAuthenticated, booksController.editbook);
router.delete('/deletebook/:id',isAuthenticated,booksController.deleteBook);


  // search endpoint
router.get('/search', searchandfilter.search);
  
  // Filter endpoint
router.get('/filter',searchandfilter.filter);
  
module.exports = router;