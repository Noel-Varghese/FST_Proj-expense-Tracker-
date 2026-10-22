require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/expenses', require('./routes/expenses'));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_tracker';

mongoose.connect(URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
  })
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
