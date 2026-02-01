const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Room service running');
});

module.exports = app;
