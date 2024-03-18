const getUser=`SELECT id FROM users WHERE email = $1`;
const addToCart =`INSERT INTO cart (user_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
const getId =`SELECT id FROM users WHERE email = $1 `;
const getCartContent =`SELECT c.*, b.title, b.author, b.gener FROM cart c JOIN books b ON c.book_id = b.id WHERE c.user_id = $1`;

module.exports={
    getUser,
    addToCart,
    getId,
    getCartContent


}