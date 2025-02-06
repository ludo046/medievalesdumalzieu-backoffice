//imports
const express = require('express');
const apiRouter = require('./apiRouter').router;
const path = require('path');
const helmet = require('helmet')
const fs = require('fs');
require('dotenv').config();
const db = require("./models");
// const { emit } = require('process');
//db.sequelize.sync();
//db.sequelize.sync({force: true});
require('dotenv').config();
const users = {};


//instantiate server
let server = express();

//parser config
server.use(express.urlencoded({ extended:true }));
server.use(express.json());
server.use(helmet({
    crossOriginEmbedderPolicy: false,
    // ...
  })
);



//configure routes
server.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

server.get('/', (req, res) => {
    res.send('<h1>node application</h1>')
})

let http = require('http').Server(server);
//let httpServer = http.Server(server);

server.use('/api/', apiRouter);
server.use('/images', express.static(path.join(__dirname, 'images')));

//launch server
http.listen(8080, function(){
    console.log('Server en écoute :)');
})




  // "development": {
  //   "username": "root",
  //   "password": "fripon",
  //   "database": "medievales",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // // },