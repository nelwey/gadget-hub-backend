const express = require('express');
const productRoutes = require('./routes/productRoutes');


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});