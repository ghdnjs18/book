const mongoose = require('mongoose');

const UserSchma = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    age: { type: Number, required: true},
    email: { type: String, required: true, trim: true},
    books: { type: Array, required: true}

});

const User = mongoose.model('User', bookSchma)
module.exports = User;