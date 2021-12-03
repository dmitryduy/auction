const express = require('express');
const app = express();
const fs = require('fs');
const https = require("https");
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
    res.render("painting", {painting: books.find(book => book.id === +req.params.id)});
});

app.get('/auction-info', (req, res) => {
    res.json(auctionInfo);
})

app.put('/editing', (req, res) => {
    const {id, title, author, country, price, photo, available, minStep, maxStep} = req.body;
    if (Number.isNaN(+price) || +price <=0) {
        res.status(400);
        res.end('Неверно установлена цена');
    }
    if (available !== 'true' && available !== 'false') {
        res.status(400);
        res.end('Поле "В аукциое?" должно принимать одно из двух значений: "true", "false"');
    }
    if (!title || !author || !country || ! available || !photo || !price || !minStep || !maxStep) {
        res.status(400);
        res.end('Есть незаполненные поля');
    }
    if (Number.isNaN(+minStep) || Number.isNaN(+maxStep)) {
        res.status(404);
        res.end(`Неверны введены значения минимального и максимального шагов`);
    }
    if (+minStep >= +maxStep) {
        res.status(404);
        res.end(`Минимальный шаг должен быть меньше максимального шага`);
    }
    const painting = books.find(painting => painting.id === +id);
    if (!painting) {
        res.status(404);
        res.end(`Такая картина не найдена`);
    }
    painting.title = title;
    painting.author = author;
    painting.country = country;
    painting.startPrice = price;
    painting.image = photo;
    painting.available = available;
    painting.minStep = minStep;
    painting.maxStep = maxStep;
    res.status(200)
    res.send("success");
})


