const router = require('express').Router();
const Expense = require('../models/Expense');

const wrap = fn => (req, res) => fn(req, res).catch(err => {
  const bad = err.name === 'ValidationError' || err.name === 'CastError';
  res.status(bad ? 400 : 500).json({ error: err.message });
});

router.get('/', wrap(async (req, res) => {
  const q = req.query.category ? { category: req.query.category } : {};
  res.json(await Expense.find(q).sort({ date: -1 }));
}));

router.post('/', wrap(async (req, res) => {
  res.status(201).json(await Expense.create(req.body));
}));

router.put('/:id', wrap(async (req, res) => {
  const e = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!e) return res.status(404).json({ error: 'Expense not found' });
  res.json(e);
}));

router.delete('/:id', wrap(async (req, res) => {
  const e = await Expense.findByIdAndDelete(req.params.id);
  if (!e) return res.status(404).json({ error: 'Expense not found' });
  res.json({ message: 'Expense deleted' });
}));

module.exports = router;
