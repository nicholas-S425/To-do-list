const express = require('express');
const mongoose = require('mongoose');
const itemModel = require('./schema/Item')
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/items', async (req, res) => {
  const items = await itemModel.find();
  res.json(items);
});

app.delete('/api/items-all', async (req, res) => {
  await itemModel.deleteMany({});
  res.json({ success: true });
});

app.delete('/api/items/:index', async (req, res) => {
  const items = await itemModel.find();
  const item = items[req.params.index];
  await itemModel.findByIdAndDelete(item._id);
  res.json({ success: true });
});

app.post('/api/items', (req, res) => {
  const { item } = req.body;
  console.log("Item added:", item);
  let newItem=new itemModel({
    name:req.body.item
  })
  newItem.save()
  .then(doc => {
    console.log("item saved")
  })
  .catch(err=>{
    console.log(err)
  })
  res.json({ success: true });
});

// Database Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("DB Connection Error:", err));
  