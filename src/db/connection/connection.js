const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
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