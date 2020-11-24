const mongoose = require("mongoose");

const contact = mongoose.Schema({
    id:       { type: string, required: true },
    name:     { type: string, required: true },
    email:    { type: string, required: true },
    phone:    { type: string, required: true },
    imageUrl: { type: string, required: true },
    group:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Contact', contact);
