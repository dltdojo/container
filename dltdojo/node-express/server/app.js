const express = require('express');
const path = require('path');
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/hello', function(req, res) {
    res.json({ message: "HELLO DLTDOJO 2017" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;