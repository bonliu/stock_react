// Dependencies
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
