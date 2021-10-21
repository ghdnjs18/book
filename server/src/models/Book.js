const mongoose = require('mongoose');

const bookSchma = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    author: { type: String, required: true, trim: true},
    summary: { type: String, trim: true},
    genre: { type: String, trim: true},
    release: { type: String, required: true, trim: true},
    ISBN: { type: Number, required: true}

});

const Book = mongoose.model('Book', bookSchma)
module.exports = Book;