'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 30000;
const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://devroot:devroot@localhost:27017/chat?authSource=admin';

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json());

// Mongoose DB setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useNewUrlParser: true }).then(mongoConnection => {
    require('./broker/broker').initBroker(mongoConnection);
});

// Routers
const router = express.Router();
router.use('/users', require('./routers/users'));
router.use('/rooms', require('./routers/rooms'));
router.use('/messages', require('./routers/messages'));


// API Logger
router.use((req, res, next) => {
    console.log('Log: ' + req.method + ' @ ' + req.originalUrl);
    next();
});

// 404 handler
router.use(function (req, res, next) {
    res.status(404).json({
        "code": 404,
        "status": "Not Found"
    });
});

app.use('/api', router);

// On startup callback
app.listen(port, function () {
    console.log('Server is up and running at ' + port);
});