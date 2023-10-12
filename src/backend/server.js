const express = require('express');
const mysql = require('mysql');

const app = express();
//Mysql connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rafvue132',
  database: 'GDatabase'
});

connection.connect();

// Define a route to retrieve all grants
app.get('/grants', async (req, res) => {
  const grants = await connection.query('SELECT * FROM grants');
  console.log(grants)
  res.json(grants);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});