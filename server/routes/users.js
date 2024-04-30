const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    await newUser.save();
    res.status(201).send('User Created');
  } catch (error) {
    res.status(500).send('Error creating User: ' + error.message);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    res.send('Login Successful')
  }
  else {
    res.status(400).send('Invalid Credentials')
  }
});

module.exports = router;