const { Pool } = require('pg');
// const connectionString = "postgresql://abhitrip2002:SKGJdj6AVbE0@ep-gentle-fire-a5y9h0be.us-east-2.aws.neon.tech/SML-canteen?sslmode=require";
// const pool = new Pool({ connectionString });

const pool = new Pool({
    user: 'canteen',
    host: '10.11.14.30',
    database: 'Canteen_Management',
    password: 'canteen',
    port: 5432,
});

module.exports = pool;