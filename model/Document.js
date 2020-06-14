const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    document: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Document', documentSchema);