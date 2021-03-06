// Dependencies
const express = require('express');
const db = require('./database.js');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 5000;

// Pre-processing to parse the body of POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/users', (req, res) => {
    const stmt = 'SELECT * FROM users';
    const params = [];

    db.all(stmt, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "users": rows
        });
    });
});

app.post('/api/login', (req, res) => {
    const stmt = 'SELECT * FROM users WHERE email = LOWER(?) AND password = ?';
    const params = [req.body.email, req.body.password];

    db.all(stmt, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else if (rows.length < 1) {
            res.json({
                "message": "fail"
            })
        } else {
            res.json({
                "message": "success",
                "data": rows
            });
        }
    });
});

app.post('/api/register', (req, res) => {
    const stmt = `INSERT INTO users (name, email, password) VALUES (UPPER(?), LOWER(?), ?)`;
    const params = [req.body.name, req.body.email, req.body.password];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success"
            });
        }
    });
});

app.post('/api/stock/count', (req, res) => {
    const stmt = `SELECT count FROM stocks WHERE email = LOWER(?) AND ticker = UPPER(?)`;
    const params = [req.body.email, req.body.ticker];

    db.get(stmt, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            if (row) {
                res.json({
                    "message": "success",
                    "count": row.count
                });
            } else {
                res.json({
                    "message": "success",
                    "count": 0
                });
            }
        }
    });
});

app.post('/api/stock/buy', (req, res) => {
    const stmt = 'INSERT INTO stocks (email, ticker, count, price) VALUES (LOWER(?), UPPER(?), ?, ?)';
    console.log(req.body);
    const params = [req.body.email, req.body.ticker, req.body.qty, req.body.price];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": {
                    "ticker": req.body.ticker.toUpperCase(),
                    "count": req.body.qty
                }
            });
        }
    });
});

app.post('/api/stock/update/count', (req, res) => {
    const stmt = 'UPDATE stocks SET count = ? WHERE email = LOWER(?) AND ticker = UPPER(?)';
    console.log(req.body);
    const params = [req.body.qty, req.body.email, req.body.ticker];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": {
                    "ticker": req.body.ticker,
                    "count": req.body.qty
                }
            });
        }
    });
});

app.post('/api/stock/update/price', (req, res) => {
    const stmt = 'UPDATE stocks SET price = ? WHERE email = LOWER(?) AND ticker = UPPER(?)';
    console.log(req.body);
    const params = [req.body.price, req.body.email, req.body.ticker];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": {
                    "ticker": req.body.ticker,
                    "price": req.body.price
                }
            });
        }
    });
});

app.post('/api/stocks/list', (req, res) => {
    const stmt = 'SELECT ticker, count, price FROM stocks WHERE email = ?';
    const params = [req.body.email];

    db.all(stmt, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/api/stocks', (req, res) => {
    const stmt = 'SELECT * FROM stocks';
    const params = [];

    db.all(stmt, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/api/balance', (req, res) => {
    const stmt = 'SELECT balance FROM users WHERE email = ?';
    const params = [req.body.email];

    db.get(stmt, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "balance": row.balance
        });
    });
});

app.post('/api/balance/update', (req, res) => {
    const stmt = 'UPDATE users SET balance = ? WHERE email = LOWER(?)';
    const params = [req.body.balance, req.body.email];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "balance": req.body.balance
            });
        }
    });
});

app.post('/api/stocks/remove', (req, res) => {
    console.log(req.body.ticker);
    console.log(req.body.email);
    const stmt = 'DELETE FROM stocks WHERE ticker = ? AND email = ?';
    const params = [req.body.ticker, req.body.email];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            console.log(err);
        } else {
            res.json({
                "message": "success"
            });
        }
    });
});

app.post('/api/stocks/drop', (req, res) => {
    const stmt = 'DROP TABLE stocks';
    const params = [];

    db.run(stmt, params, (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success"
            });
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
