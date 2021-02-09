"use strict";

var express = require('express');
var app = express();
const api = require('./routes/api');
var express = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api',api);

const port = process.env.Port || 6000;

app.listen(port);

