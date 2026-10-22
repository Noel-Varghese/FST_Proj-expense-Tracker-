const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title:    { type: String, required: [true, 'Title is required'], trim: true, maxlength: 80 },
  amount:   { type: Number, required: [true, 'Amount is required'], min: [0, 'Amount cannot be negative'] },
  category: { type: String, enum: ['Food', 'Travel', 'Shopping', 'Bills', 'Other'], default: 'Other' },
  date:     { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
