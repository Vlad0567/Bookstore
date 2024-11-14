const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    publisher: String,
    pages: Number,
    language: String,
    summary: String,
    price: Number,
    discount: Number,
    genre: [String],
    image: String,
});

module.exports = mongoose.model('Book', bookSchema);
