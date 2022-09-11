var express = require('express');
const cors = require('cors');
require('dotenv').config()



var app = express();
app.use(cors());

app.use('/sistema', require('./routes/index.js'));



app.listen(4000, function() {
    console.log('Aplicación escuchando en el puerto 4000');
  });