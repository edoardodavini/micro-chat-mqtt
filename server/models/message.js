'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);;
