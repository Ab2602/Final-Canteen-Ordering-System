const { Pool } = require('pg');
// const connectionString = "postgresql://abhitrip2002:SKGJdj6AVbE0@ep-gentle-fire-a5y9h0be.us-east-2.aws.neon.tech/SML-canteen?sslmode=require";
// const pool = new Pool({ connectionString });

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Secure@123',
    port: 5432,
});

module.exports = pool;