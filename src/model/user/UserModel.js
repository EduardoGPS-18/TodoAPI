const { client, salts } = require("../../db/connection/connection");
const { ModelErrorsFactory } = require('../errors/errors');
const { daysFromMilliseconds } = require('../helpers/getDaysFromMilliseconds');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userTable = 'users';
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    async register({email, name, password}) {
        const daysFromMilliseconds = days => days * 24 * 60 * 60 * 1000;    
        const iat = new Date().getTime() + daysFromMilliseconds(7);
        const token = jwt.sign({name, email, iat}, jwtSecret);

        const sql = `INSERT INTO ${userTable}(name, email, password, session) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const hashedPassword = await bcrypt.hash(password, salts);
        const queryValues = [name, email, hashedPassword, token];
        try {
            return (await client.query(sql, queryValues)).rows[0];
        } catch(err) {
            throw ModelErrorsFactory.duplicatedData(`Email já está em uso!`);
        }
    },
    
    async login({email, password}) {
        const sql = `SELECT * FROM ${userTable} WHERE email=$1;`;
        const user = (await client.query(sql, [email])).rows[0];

        if(user && await bcrypt.compare(password, user.password)) {
            return await this.updateTokenInDatabase({email});
        } else {
            ModelErrorsFactory.invalidUser('Usuário invalido ou inexistente!');
        }
        
        ModelErrorsFactory.invalidUser('Usuário invalido ou inexistente!');
    },
    
    async updateTokenInDatabase({email}) {
        
        const iat = new Date().getTime() + daysFromMilliseconds(7);
        const token = jwt.sign({email, iat}, jwtSecret);

        const sql = `UPDATE ${userTable} SET session=$1 WHERE email=$2 RETURNING *;`;
        const queryValues = [token, email];

        return (await client.query(sql, queryValues)).rows[0];
    },

    async verifyAuth({token}) {
        const sql = `SELECT * FROM ${userTable} WHERE session=$1;`;
        const user = (await client.query(sql, [token])).rows[0];
        if(!user) {
            throw Error();
        }
        return user;
    },
}