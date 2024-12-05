const mongoose = require('mongoose');

const GroupingsSchema = new mongoose.Schema({
    category: String,
    marker: String
});

const EntrySchema = new mongoose.Schema({
    label: String,
    category: String,
    value: Number,
    timestamp: Date
});

const Groupings = mongoose.model('Groupings', GroupingsSchema);
const Entry = mongoose.model('Entry', EntrySchema);

module.exports = { Groupings, Entry };
