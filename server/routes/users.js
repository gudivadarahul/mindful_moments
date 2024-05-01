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
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    req.session.userId = savedUser._id;
    res.status(201).send('User Created');
  } catch (error) {
    res.status(500).send('Error creating User: ' + error.message);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.userId = user._id;
      res.send('Login Successful');
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (error) {
    res.status(500).send('Error during login: ' + error.message);
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Failed to log out');
    } else {
      res.send('Logout successful');
    }
  });
});

// user page route
router.get('/user-page', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized: No Session available');
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(`${user.username}`);
  } catch (error) {
    res.status(500).send('Error retrieving user data')
  }
});



module.exports = router;