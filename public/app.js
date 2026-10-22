const API = '/api/expenses';
const CATS = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];
const $ = id => document.getElementById(id);
let items = [];
let editingId = null;

CATS.forEach(c => { $('category').add(new Option(c, c)); $('filter').add(new Option(c, c)); });
$('date').valueAsDate = new Date();

const esc = s => s.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

async function load() {
  const cat = $('filter').value;
  try {
    items = await request(API + (cat ? `?category=${encodeURIComponent(cat)}` : ''));
    render();
  } catch (err) { alert('Could not load expenses: ' + err.message); }
}

function render() {
  $('total').textContent = '₹' + items.reduce((s, e) => s + e.amount, 0).toFixed(2);
  $('list').innerHTML = items.length ? items.map(e => `
    <li>
      <div><b>${esc(e.title)}</b><small>${e.category} on ${new Date(e.date).toLocaleDateString()}</small></div>
      <span class="amt">₹${e.amount.toFixed(2)}</span>
      <div class="btns">
        <button class="ghost" data-edit="${e._id}">Edit</button>
        <button class="danger" data-del="${e._id}">Delete</button>
      </div>
    </li>`).join('') : '<p class="empty">No expenses yet. Add your first one above.</p>';
}

$('form').addEventListener('submit', async e => {
  e.preventDefault();
  const body = JSON.stringify({
    title: $('title').value, amount: Number($('amount').value),
    category: $('category').value, date: $('date').value
  });
  try {
    await request(editingId ? `${API}/${editingId}` : API, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body
    });
    resetForm(); load();
  } catch (err) { alert('Could not save: ' + err.message); }
});

function resetForm() {
  editingId = null;
  $('form').reset();
  $('date').valueAsDate = new Date();
  $('save').textContent = 'Add expense';
  $('cancel').hidden = true;
}

$('cancel').addEventListener('click', resetForm);
$('filter').addEventListener('change', load);

$('list').addEventListener('click', async e => {
  const editId = e.target.dataset.edit, delId = e.target.dataset.del;
  if (editId) {
    const x = items.find(i => i._id === editId);
    editingId = editId;
    $('title').value = x.title; $('amount').value = x.amount;
    $('category').value = x.category; $('date').value = x.date.slice(0, 10);
    $('save').textContent = 'Save changes';
    $('cancel').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (delId && confirm('Delete this expense?')) {
    try { await request(`${API}/${delId}`, { method: 'DELETE' }); load(); }
    catch (err) { alert('Could not delete: ' + err.message); }
  }
});

load();
