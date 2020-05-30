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

async function getRoom(req, res, next) {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
}

async function getRooms(req, res, next) {
    if (req.query.path) {
        const room = await Room.find({mqttPath: req.query.path})
        res.status(200).json(room);
	} else {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
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
    const room = await Room.findById(req.params.id)

    if (req.body.name) {
        room.name = req.body.name;
    }
    if (req.body.mqttPath) {
        room.mqttPath = req.body.mqttPath;
    }
    await room.save();
    res.send(room)
}

async function deleteRoom(req, res, next) {
    const room = await Room.findById(req.params.id);
    if (!room) {
        res.status(404).json({
            "status": "error",
            "message": "Room does not exists"
        });
    } else {
        const deletedRoom = await room.delete();
        res.status(200).json(deletedRoom);
    }
}

module.exports = router;
