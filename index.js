const express = require('express');
const app = express();
const fs = require('fs');
const https = require( "https" );
const bodyParser = require('body-parser');

const options = {
    key: fs.readFileSync('./certificates/privatekey.key'),
    cert: fs.readFileSync('./certificates/certificate.crt')
};
https.createServer(options, app).listen(443);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/" + "index.html");
})




app.listen(3000, () => console.log('server start'))