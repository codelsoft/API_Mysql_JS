const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

const postsRoute =require('./routes/posts');

app.use(bodyParser.json());



app.use("/posts",postsRoute);



module.exports = app;