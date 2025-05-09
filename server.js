require('dotenv').config();
const path = require("path");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const jobRoutes = require('./eatyrouts/adminrout'); // ✅ Make sure filename is jobrout.js

const app = express();

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ CORS Setup
const allowedOrigins = [
  'https://localhost',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://eatyapp.netlify.app',
  'https://eatypartner.netlify.app',
  'https://eatyadmin.netlify.app',
  'https://cybertestproject.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Route binding

app.use('/jobs', jobRoutes); // Jobs route

// ✅ DB Connect + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to database");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
