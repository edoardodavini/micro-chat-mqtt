const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: String,
    mqttPath: String
});
module.exports = mongoose.model('Room', RoomSchema);
