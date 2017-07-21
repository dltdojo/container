const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

var con = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

con.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Connected!");
  }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(function (req, res, next) {
  req.con = con;
  next();
});

app.get('/hello', function (req, res) {
  res.json({ message: "HELLO DLTDOJO 2017" });
});

app.get('/api', function (req, res, next) {
  var db = req.con;
  var data = "";
  db.query('select * from mytable', function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    res.json({ data: data });
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;