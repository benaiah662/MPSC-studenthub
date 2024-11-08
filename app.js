const express = require('express');
const path = require('path');
const { Pool } = require('pg'); // PostgreSQL connection

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'mpsc', // Replace with your database name
  password: 'Beowulf12', // Replace with your password
  port: 5432,
});

// Basic route for rendering the homepage
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT username FROM users WHERE id = $1', [1]);
    const username = result.rows.length > 0 ? result.rows[0].username : 'Guest';
    res.render('index', { title: 'Student Hub', username: username });
  } catch (error) {
    console.error('Error executing query:', error);
    res.send('Error fetching user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
