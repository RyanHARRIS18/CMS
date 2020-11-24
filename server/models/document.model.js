const mongoose = require("mongoose");

const document = mongoose.Schema({
    id:           { type: string, required: true },
    name:         { type: string, required: true },
    description:  { type: string, required: true },
    url:          { type: string, required: true },
});

module.exports = mongoose.model('Document', document);
