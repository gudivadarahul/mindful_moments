const mongoose = require('mongoose');

const dbURI = "mongodb+srv://gudivadarahul:ztqqStTfTcAjmWaz@cluster0.jsdvyxm.mongodb.net/";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase timeout to handle longer connection times if needed
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
