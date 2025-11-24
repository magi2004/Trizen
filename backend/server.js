const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trizen';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  image: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Routes

// GET /products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /search?q=term - Search products by name
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (!query.trim()) {
      return res.json([]);
    }

    // Case-insensitive partial match search
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).limit(5);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Seed database with sample products (optional endpoint for initial setup)
app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    
    const sampleProducts = [
      { name: 'Smartphone Max 20', category: 'Electronics', price: 29999, rating: 4.5, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
      { name: 'Wireless Headphones Pro', category: 'Electronics', price: 4999, rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { name: 'Laptop Ultra 15', category: 'Electronics', price: 89999, rating: 4.7, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
      { name: 'Smart Watch Series 5', category: 'Electronics', price: 12999, rating: 4.2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
      { name: 'Bluetooth Speaker', category: 'Electronics', price: 3499, rating: 4.0, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
      { name: 'Running Shoes Sport', category: 'Fashion', price: 3999, rating: 4.4, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Casual T-Shirt', category: 'Fashion', price: 999, rating: 4.1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
      { name: 'Denim Jeans Classic', category: 'Fashion', price: 2499, rating: 4.3, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
      { name: 'Leather Jacket', category: 'Fashion', price: 5999, rating: 4.6, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { name: 'Sneakers Premium', category: 'Fashion', price: 5499, rating: 4.5, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
      { name: 'Coffee Maker Deluxe', category: 'Home', price: 8999, rating: 4.4, image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400' },
      { name: 'Air Purifier Pro', category: 'Home', price: 12999, rating: 4.3, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' },
      { name: 'Vacuum Cleaner', category: 'Home', price: 6999, rating: 4.2, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
      { name: 'Desk Lamp LED', category: 'Home', price: 1999, rating: 4.0, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400' },
      { name: 'Air Fryer Max Crisp', category: 'Home', price: 14999, rating: 4.4, image: 'https://images.unsplash.com/photo-1506368083636-6defb67639c5?w=400' },
      { name: 'Dumbbell Set 20kg', category: 'Sports', price: 4999, rating: 4.5, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' },
      { name: 'Basketball Official', category: 'Sports', price: 1999, rating: 4.4, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
      { name: 'Smart Fitness Tracker', category: 'Sports', price: 5999, rating: 4.4, image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400' },
      { name: 'Gaming Mouse RGB', category: 'Electronics', price: 2499, rating: 4.4, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
      { name: 'Mechanical Keyboard', category: 'Electronics', price: 5999, rating: 4.5, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
      { name: 'Smart Home Hub Mini', category: 'Electronics', price: 15999, rating: 4.4, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400' },
      { name: 'Portable Projector Beam', category: 'Electronics', price: 18999, rating: 4.1, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
      { name: 'Ergonomic Office Chair', category: 'Home', price: 12999, rating: 4.5, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400' },
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: 'Database seeded successfully', count: sampleProducts.length });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

