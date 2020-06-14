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
    imgurl: {
        type: String,
        required: false
    },
    lat: {
        type: Number,
        required: false
    },
    lon: {
        type: Number,
        required: false
    },
    UserId: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Note', noteSchema);