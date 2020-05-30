'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user')

// REST
router.route('/:id')
	.get(getUser)
	.put(editUser)
	.delete(deleteUser);
router.route('/')
	.get(getUsers)
	.post(addUser);

async function getUser(req, res, next) {
	let user = null
	if (req.params.id) {
		user = await User.findById(req.params.id)
	} else if (req.query.mqttId) {
		user = await User.findOne({mqttId: req.query.mqttId})
	}
    if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({})
	}
}

async function addUser(req, res, next) {
	try {
		const user = new User(req.body);
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch(err) { 
		if (err.name && err.name === 'ValidationError') {
			console.log(err);
			res.status(400).json(err);
		} else {
			res.status(500).send(err);
		}
	}
}

async function getUsers(req, res, next) {
    const users = await User.find();
    res.status(200).json(users);
}

async function editUser(req, res, next) {
	res.status(501).send('TODO');
}

async function deleteUser(req, res, next) {
	res.status(501).send('TODO');
}


module.exports = router;
