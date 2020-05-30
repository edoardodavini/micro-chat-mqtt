'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const User = require('./models/user');

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

// Auth Management: TODO
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         const user = User.findOne({ username: username });
//         if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         // everything is ok
//         return done(null, user);
//     })
// );

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

// enable all routers
app.use('/api', router);
// enable login auth

// On startup callback
app.listen(port, function () {
    console.log('Server is up and running at ' + port);
});