const express = require('express')
const wordRouter = express.Router()
const Word = require('../../models/Word')

// 정규표현식 ()? 옵션주기
wordRouter.route('/(:wordClass)?/(:word)?').get( async (req, res) => {
    let words = []
    // 비구조화 할당 / 특정 property를 풀어서 가져올수있디.
    const { wordClass, word } = req.params
    
    if (word != "undefined" && word != undefined){
        console.log(word)
        // DB에서 쿼리로 단어를 검색
        // 단어 명으로 찾기
        if (wordClass === "wordName") {
            words = await Word.find({keyword: {'$regex':word}});
        } else {
            // 품사로 찾기
            words = await Word.find({word_class: {'$regex':word}});
        }
    }else {
        console.log(word)
        words = await Word.find()
        // DB에서 전체 단어 검색
    }
    res.json({status:200, words})
})

module.exports = wordRouter