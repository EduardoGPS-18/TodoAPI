const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
} || process.env.DATABASE_URL);
const salts = Number(process.env.CRYPT_SALTS);

module.exports = {
    client,
    salts,
    async connect(){
        await client.connect();
    },
    async disconnect(){
        await client.end();
    }
}