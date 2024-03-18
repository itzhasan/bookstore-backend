const createOrder= `INSERT INTO orders (user_id, total_amount, shipping_address) VALUES ($1, $2, $3) RETURNING id`;
const orderItems =`INSERT INTO order_items (order_id, book_id, quantity) VALUES ($1, $2, $3)`
const bookAvailable=`UPDATE books SET available = available - $1 WHERE id = $2`


module.exports={
    createOrder,
    orderItems,
    bookAvailable
}