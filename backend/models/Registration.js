const mongoose = require('mongoose');

// Define the Registration schema
const registrationSchema = new mongoose.Schema({
  name: String,
  address: String,
  admin: String,
  mobile: String,
  password: String,
  lockerBoxes: Number,
  lockersPerBox: Number
});

// Create the Registration model
module.exports = mongoose.model('Registration', registrationSchema);