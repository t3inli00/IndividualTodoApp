/* eslint-disable no-undef */
import { hash } from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { pool } from './db.js';

const _dirname =import.meta.dirname

const initializeTestDB = () => {
    const sql =fs.readFileSync(path.resolve(_dirname,"../todo.sql"),"utf8");
    pool.query(sql)
}

const insertTestUser = (email,password) =>{
    hash(password,10,(error,hashedPassword) =>{
        pool.query('insert into account (email,password) values($1,$2)',
            [email,hashedPassword]
        )
    })
}

const getToken =(email) => {
    const secretKey = process.env.JWT_SECRET_KEY;  // Ensure this is defined in your .env file
    if (!secretKey) {
        throw new Error('JWT_SECRET_KEY is not defined');
    }
    return jwt.sign({ email }, secretKey, { algorithm: 'HS256' });
}

export { getToken, initializeTestDB, insertTestUser };

