const getBooks ='SELECT * FROM books';
const addbook='INSERT INTO books (title, author, gener, price, available) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const editbook ='UPDATE books SET title = $1, author = $2, gener = $3, price = $4, available = $5 WHERE id = $6 RETURNING *';
const deletebook='DELETE FROM books WHERE id = $1';
const search = `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR gener ILIKE $1`;
const gener = 'SELECT * FROM books WHERE gener = $1';
module.exports={
    getBooks,  
    addbook,
    editbook,
    deletebook,
    search,
    gener
};