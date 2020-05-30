'use strict';
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Room = require('../models/room');

const USER_POPULATE = '_id mqttId displayName username imageUrl';
const ROOM_POPULATE = '_id roomName mqttPath';

// REST
router.route('/:id')
	.get(getMessage)
	.put(editMessage)
	.delete(deleteMessage);
router.get('/', getMessages);

async function getMessage(req, res, next) {
	let message = null
	if (req.params.id) {
		message = await Message.findById(req.params.id).populate('user', USER_POPULATE).populate('room', ROOM_POPULATE);
	} 
    if (message) {
		res.status(200).json(message);
	} else {
		res.status(404).json({})
	}
}

async function getMessages(req, res, next) {
	// TODO: add filters
	let messages = null;
	if (req.query.roomPath) {
		const room = await Room.find({mqttPath: req.query.roomPath})
		messages = await Message.find({room: room}).populate('user', USER_POPULATE).populate('room', ROOM_POPULATE);
	}
	if (messages) {
		res.status(200).json(messages);
	} else {
		res.status(404).json({})
	}
}

async function editMessage(req, res, next) {
	res.status(501).send('TODO');
}

async function deleteMessage(req, res, next) {
	res.status(501).send('TODO');
}


module.exports = router;
