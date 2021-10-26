const mongoose = require('mongoose')

const wordchema = mongoose.Schema({
    seq: {type: String, trim: true},
    keyword: {type: String, trim: true},
    link: {type: String, trim: true},
    hanja: {type: String, trim: true},
    word_class: {type: String, trim: true},
    meaning: {type: String, trim: true}
})

const Word = mongoose.model('Word', wordchema, 'kor_dic_col')
module.exports = Word;