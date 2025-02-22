const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('FeedBack', feedBackSchema);