require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === 'production';

const PRICES_API_KEY = process.env.PRICES_API_KEY || '';
const PRICES_API_BASE = 'https://api.pricesapi.io/api/v1';

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use(session({
  store: new PgSession({ pool, tableName: 'session' }),
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'change_this_secret_in_production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

app.get('/', (req, res) => {
  res.send('PriceTracker server is running.');
});

app.use('/api', authRoutes);

app.get('/api/search', async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q || !String(q).trim()) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }
  try {
    const response = await fetch(
      `${PRICES_API_BASE}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&api_key=${PRICES_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach prices API.' });
  }
});

app.get('/api/products/:id/offers', async (req, res) => {
  const { id } = req.params;
  const { country = 'us', limit = 10 } = req.query;
  try {
    const response = await fetch(
      `${PRICES_API_BASE}/products/${encodeURIComponent(id)}/offers?country=${country}&limit=${limit}&api_key=${PRICES_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach prices API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});