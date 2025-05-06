// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ------------------- ROUTES ------------------- //

// POST /api/register
app.post('/api/register', async (req, res) => {
  try {
    const { name, adminName, address, mobile, password, boxCount, lockersPerBox } = req.body;

    const existingUser = await Registration.findOne({ mobile });
    if (existingUser) {
      return res.status(409).json({ message: 'Mobile number already registered.' });
    }

    const totalLockers = boxCount * lockersPerBox;
    const lockers = Array.from({ length: totalLockers }, (_, i) => ({
      lockerId: `L${i + 1}`,
      isOccupied: false,
      parcelDetails: null
    }));

    const newUser = new Registration({
      name,
      adminName,
      address,
      mobile,
      password,
      boxCount,
      lockersPerBox,
      lockers
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { mobileOrName, password } = req.body;
  try {
    const user = await Registration.findOne({
      $or: [{ mobile: mobileOrName }, { name: mobileOrName }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        adminName: user.adminName,
        address: user.address,
        mobile: user.mobile,
        boxCount: user.boxCount,
        lockersPerBox: user.lockersPerBox
      }
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/locker-status/:mobile
app.get('/api/locker-status/:mobile', async (req, res) => {
  try {
    const user = await Registration.findOne({ mobile: req.params.mobile });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ lockers: user.lockers });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/assign-locker
app.post('/api/assign-locker', async (req, res) => {
  const { mobile, lockerId, recipientName, phone, productId } = req.body;

  if (!recipientName || !phone || !productId) {
    return res.status(400).json({ message: 'All parcel details are required.' });
  }

  try {
    const user = await Registration.findOne({ mobile });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const lockerIndex = user.lockers.findIndex(l => l.lockerId === lockerId);
    if (lockerIndex === -1) {
      return res.status(404).json({ message: 'Locker not found' });
    }

    user.lockers[lockerIndex].isOccupied = true;
    user.lockers[lockerIndex].parcelDetails = { recipientName, phone, productId };

    await user.save();

    res.status(200).json({ message: 'Locker assigned successfully', locker: user.lockers[lockerIndex] });
  } catch (error) {
    console.error("❌ Assign locker error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST /api/unassign-locker
app.post('/api/unassign-locker', async (req, res) => {
  const { mobile, lockerId } = req.body;

  try {
    const user = await Registration.findOne({ mobile });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const lockerIndex = user.lockers.findIndex(l => l.lockerId === lockerId);
    if (lockerIndex === -1) {
      return res.status(404).json({ message: 'Locker not found' });
    }

    user.lockers[lockerIndex].isOccupied = false;
    user.lockers[lockerIndex].parcelDetails = null;

    await user.save();

    res.status(200).json({ message: 'Locker unassigned successfully', locker: user.lockers[lockerIndex] });
  } catch (error) {
    console.error("❌ Unassign locker error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
