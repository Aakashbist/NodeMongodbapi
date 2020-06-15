const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    lat: {
        type: Number,
        required: false
    },
    lng: {
        type: Number,
        required: false
    },
    UserId: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Note', noteSchema);