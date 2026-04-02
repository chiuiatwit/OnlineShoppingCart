const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  user:     process.env.DB_USER     || process.env.POSTGRES_USER     || 'postgres',
  password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.DB_NAME     || process.env.POSTGRES_DB       || 'shopping_cart',
});

module.exports = pool;
