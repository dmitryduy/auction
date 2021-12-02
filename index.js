const express = require('express');
const app = express();
const fs = require('fs');
const https = require( "https" );
const bodyParser = require('body-parser');

const options = {
    key: fs.readFileSync('./certificates/privatekey.key'),
    cert: fs.readFileSync('./certificates/certificate.crt')
};

const books = JSON.parse(fs.readFileSync('./gallery.json'));
const auctionInfo = JSON.parse(fs.readFileSync('./auctionInfo.json'));

https.createServer(options, app).listen(443);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render("index", {books});

});

app.get('/painting/:id', (req, res) => {
   res.render("painting", {painting: books.find(book => book.id === +req.params.id)}) ;
});

app.get('/auction-info', (req, res) => {
    res.json(auctionInfo);
})



