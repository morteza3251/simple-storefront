const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let products = [
  { id: 1, name: "شیرآلات بهداشتی", price: 250000 },
  { id: 2, name: "پمپ آب کشاورزی", price: 1500000 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});