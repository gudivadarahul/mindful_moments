const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use()

app.get('/', (req, res) => {
  res.send("App Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
