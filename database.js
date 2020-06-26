const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        
        console.log('Creating users table...');
        let createUsers = `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT,
            balance REAL DEFAULT 5000.00,
            profit REAL DEFAULT 0,
            stocks TEXT,
            CONSTRAINT email_unique UNIQUE (email)
        )`;
        db.run(createUsers, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let insert = `INSERT INTO users (
                                name, email, password
                            ) VALUES (UPPER(?), LOWER(?), ?)`;
                db.run(insert, ['admin', 'admin@stockpro.com', md5('incorrect')]);
            }
        });

        console.log('Creating stocks table...');
        let createStocks = `CREATE TABLE stocks (
            email TEXT,
            ticker TEXT,
            count INTEGER,
            price REAL
        )`;
        db.run(createStocks, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

module.exports = db;
