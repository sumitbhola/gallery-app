var express = require('express');
var app = express();
const morgan = require('morgan')
bodyParser = require('body-parser');
require('dotenv').config();
port = process.env.PORT || 5000;
var cors = require('cors');
const uri = "mongodb+srv://sumit-bhola:sumit-123@firstcluster.c6kxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require('mongoose'); 
mongoose
  .connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(morgan('dev'))
app.listen(port); 
console.log('API server started on: ' + port);
app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
var routes = require('./router/appRouter'); 
routes(app); 
