const mongoose = require('mongoose');

const LockerSchema = new mongoose.Schema({
  lockerId: String,
  isOccupied: Boolean,
  parcelDetails: {
    type: Object,
    default: null
  }
});

const RegistrationSchema = new mongoose.Schema({
  name: String,
  adminName: String,
  address: String,
  mobile: String,
  password: String,
  boxCount: Number,
  lockersPerBox: Number,
  lockers: [LockerSchema]
});

module.exports = mongoose.model('Registration', RegistrationSchema);
