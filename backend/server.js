var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hola mundo');
})

app.listen(4000, function() {
    console.log('Aplicación escuchando en el puerto 4000!');
  });