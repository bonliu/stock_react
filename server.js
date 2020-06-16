// Dependencies
const express = require('express');
const db = require('./database.js');
// const md5 = require('md5');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Pre-processing to parse the body of POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require('express-handlebars');
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
            "data": rows
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

    db.run(stmt, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        } else {
            res.json({
                "message": "success",
                "data": rows
            });
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
