var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var ReservationController = require(__root + 'Reservation/ReservationController');
app.use('/api/reservation', ReservationController);


module.exports = app;