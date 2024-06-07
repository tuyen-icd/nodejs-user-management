const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    notification: {
        type: String,
        required: true
    },
    isCheck: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);