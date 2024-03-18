const express = require("express");
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const getRouter = require("./src/books_mg/router");
const authRouter = require('./src/auth/router');

const cartRouter = require('./src/cart/router');

const checkoutRouter = require('./src/checkout/router')

const cors = require("cors");
const PORT = 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/books',getRouter);
app.use('/auth',authRouter);
app.use('/cart',cartRouter);
app.use('/orders',checkoutRouter);

app.get("/", async (req, res) => {
  res.json({ message: "hellow", name: "hasan" });
});

app.listen(PORT, () => {
  console.log(`Server started at${PORT}`);
});
