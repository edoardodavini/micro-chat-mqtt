'use strict';
const express = require('express');
const router = express.Router();
const Room = require('../models/room')

// REST
router.route('/:id')
    .get(getRoom)
    .put(editRoom)
    .delete(deleteRoom);
router.get('/', getRooms).post('/', postRoom);

function getRoom(req, res, next) {
    Room.findById(req.params.id).then(room => {
        res.status(200).json(room);
    })
}

async function getRooms(req, res, next) {
    const rooms = await Room.find();
    res.status(200).json(rooms);
}

async function postRoom(req, res, next) {
    const mqttPath = req.body.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const existingRoom = await Room.find({mqttPath: mqttPath})

    if (existingRoom.length > 0) {
        res.status(400).json({
            "status": "error",
            "message": "Room already exists"
        });
    } else {
        const room = new Room({
            name: req.body.name,
            mqttPath: req.body.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        });
        await room.save();
        res.send(room);
    }
}

async function editRoom(req, res, next) {
    const room = await Room.findOne({ _id: req.params.id })

    if (req.body.name) {
        room.name = req.body.name;
    }
    if (req.body.mqttPath) {
        room.mqttPath = req.body.mqttPath;
    }
    await room.save();
    res.send(room)
}

function deleteRoom(req, res, next) {
    res.status(501).send('TODO');
}


module.exports = router;
