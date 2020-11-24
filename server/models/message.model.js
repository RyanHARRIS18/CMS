const mongoose = require("mongoose");

const message = mongoose.Schema({
    id:      { type: string, required: true },
    subject: { type: string, required: true },
    msgText: { type: string, required: true },
    sender:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Message', message);
