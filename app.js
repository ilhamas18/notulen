require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require("path")

app.use(cors());
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
global.__basedir = __dirname;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

module.exports = app;