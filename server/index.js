const express = require('express');
const userRoutes = require('./routes/users');

require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send("App Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
