const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = 'db.sqlite';
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        let create = `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text,
            password text,
            balance integer DEFAULT 500000,
            profit integer DEFAULT 0,
            stocks text,
            CONSTRAINT email_unique UNIQUE (email)
        )`;
        db.run(create, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let insert = `INSERT INTO users (
                                name, email, password
                            ) VALUES (?, ?, ?)`
                db.run(insert, ['admin', 'admin@stockpro.com', md5('incorrect')]);
            }
        });
    }
});

module.exports = db;
