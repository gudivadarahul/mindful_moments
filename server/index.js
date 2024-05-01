const express = require('express');
const userRoutes = require('./routes/users');
const session = require('express-session');

require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// include session middleware
app.use(session({
  secret: 'my_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send("App Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
