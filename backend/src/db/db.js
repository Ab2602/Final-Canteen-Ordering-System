const { Pool } = require('pg');

const pool = new Pool({
    user: 'canteen',
    host: '10.11.14.30',
    database: 'Canteen_Management',
    password: 'canteen',
    port: 5432,
});

module.exports = pool;