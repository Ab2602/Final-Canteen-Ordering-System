const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const db = require('./db/db');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/auth', authRoutes);
app.use('/user', authenticateToken, userRoutes);
app.use('/locations',locationRoutes);
app.use('/hot-snacks',itemRoutes);
app.use('/beverages',itemRoutes);
app.use('/munchies',itemRoutes);
app.use('/orders',orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});