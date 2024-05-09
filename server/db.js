const mongoose = require('mongoose');

const dbURI = "mongodb+srv://gudivadarahul:ztqqStTfTcAjmWaz@cluster0.jsdvyxm.mongodb.net/";

mongoose.connect(dbURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
