const { Client } = require('pg');

const remoteConnectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}
const localConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}
const client = new Client(
    process.env.DATABASE_URL ? remoteConnectionConfig : localConnectionConfig
);

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