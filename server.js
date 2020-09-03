const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/', (req, res) => {
    console.log('fsfsfdf');
    res.send('Miguel Vargas')
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App at: http://localhost:${port}`);
    }
});

module.exports = app;
