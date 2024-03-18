const pool = require("../../db");
const queries = require('./query')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const login = async (req, res) =>  {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(queries.login, [email]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const costmer = {
        user: {
          id: user.id,
          email: user.email,
        }
      };

      jwt.sign(costmer, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const signup = async (req, res) => {
    const { email,password} = req.body;

    try {
        // Check if user already exists
        const userExists = await pool.query(queries.getUser, [email]);
        if (userExists.rows.length > 0) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert user into database
        await pool.query(queries.signup, [email, hashedPassword]);
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed' });
      }
    };
    
module.exports={
    login,
    signup
};