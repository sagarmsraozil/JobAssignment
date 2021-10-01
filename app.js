//third party modules
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

//core modules
const http = require('http');
const path = require('path');

//database
const db = require('./database/db');

//configuration for dotenv
dotenv.config({
    "path":'./.env'
})

//environment
const app = express();
const server = http.createServer(app);

//routes
const categoryRoute = require('./routes/categoryRoute');

//express work
if(process.env.NODE_ENV.trim().toLowerCase() == "development") {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.urlencoded({'extended':false}));
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'/images')));

//app and routes
app.use('/api/category',categoryRoute);

let port = 90 || process.env.PORT
server.listen(port,()=>{
    console.log(`Server is running on port number ${port}.`.yellow.bold);
})


