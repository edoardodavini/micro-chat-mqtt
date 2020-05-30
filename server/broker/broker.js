MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://devroot:devroot@localhost:27017/chat?authSource=admin';

const ws = require('websocket-stream')

const Room = require('../models/room');
const User = require('../models/user');
const Message = require('../models/message');

const mongoose = require('mongoose')
const mqemitter = require('mqemitter-mongodb');
const mongoPersistence = require('aedes-persistence-mongodb');

function initBroker(mongoConnection) {
    const aedes = require('aedes')({
        // using mongoose
        persistence: mongoPersistence({
            db: mongoose.connection.useDb(process.env.MONGO_DATABASE ? process.env.MONGO_DATABASE : 'chat').db
        }),
        // using mongo-client
        // persistence: mongoPersistence({
        //     url: MONGO_URL,
        //     // Optional ttl settings
        //     ttl: {
        //         packets: 300, // Number of seconds
        //         subscriptions: 300
        //     }
        // }),
        mq: mqemitter({
            url: MONGO_URL
        })
    });

    const mqttServer = require('net').createServer(aedes.handle);
    const mqttPort = process.env.MQTT_PORT ? process.env.MQTT_PORT : 8883;
    const wsPort = process.env.WS_PORT ? process.env.WS_PORT : 8885;
    
    const httpServer = require('http').createServer();
    ws.createServer({ server: httpServer }, aedes.handle);

    httpServer.listen(wsPort, function () {
        console.log('MQTT-WS listening on port: ' + wsPort);
        aedes.publish({ topic: 'aedes/hello', payload: "I'm broker " + aedes.id });
    });

    mqttServer.listen(mqttPort, () => {
        console.log('MQTT Broker up and Running on port: ' + mqttPort);
    });

    aedes.on('client', client => {
        console.log('Client CONNECTED: ' + client.id);
        User.findOne({ mqttId: client.id }).then(u => {
            if (!u) {
                // user does not exists.
                console.log('USER WITH MQTT ID ' + client.id + ' IS NOT REGISTERED');
            } else {
                console.log('USER WITH MQTT ID ' + client.id + ' IS ' + u.displayName);
            }
        })
    });

    aedes.on('clientDisconnect', client => {
        console.log('Client DISCONNECTED: ' + client.id);
    });

    aedes.on('publish', publishedMessage => {
        console.log('Published ' + publishedMessage.payload.toString() + ' on: ' + publishedMessage.topic);
    });

    aedes.on('subscribe', msg => {
        console.log('subscribe')
    });

    aedes.mq.on('room/+', (package, cb) => {
        const stringMessage = package.payload.toString();
        const jsonMessage = JSON.parse(stringMessage);
        const msg = new Message(jsonMessage);
        console.log('Message is', msg);
        Room.findOne({ mqttPath: package.topic.substring(5) }).then(room => {
            console.log(room);
            if (room) {
                msg.room = room._id;
                msg.save();
            }
            cb();
        });
    })
}

module.exports = {
    initBroker: initBroker
}