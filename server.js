const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname + '/static')));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/productData', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/final_products.json'));
});

app.listen(3001);
