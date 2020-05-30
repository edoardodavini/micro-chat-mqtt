const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mqttId: String,
    displayName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: String
});
module.exports = mongoose.model('User', UserSchema);
