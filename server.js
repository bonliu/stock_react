// Dependencies
const express = require('express');
const db = require('./database.js');
const md5 = require('md5');

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => console.log(`Listening on port ${port}`));
