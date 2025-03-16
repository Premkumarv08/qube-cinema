const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
const PORT = process.env.PORT || 3001;

app.get('/v1/collections', (req, res) => {
  res.json(data.collections);
});

app.get('/v1/collections/:id', (req, res) => {
  const id = req.params.id;
  const collection = data[`collections/${id}`];
  
  if (collection) {
    res.json(collection);
  } else {
    res.status(404).json({ error: "Collection not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});