const express = require('express')
const wordRouter = express.Router()
const Word = require('../../models/Word')

// 정규표현식 ()? 옵션주기
wordRouter.route('/(:wordClass)?/(:word)?').get( async (req, res) => {
    let words = []
    // 비구조화 할당 / 특정 property를 풀어서 가져올수있디.
    const { wordClass, word } = req.params
    console.log(word)
    
    if (word != "undefined" && word != undefined){
        const queries = word.replace(/,/gi, '|')
        console.log(queries)
        // DB에서 쿼리로 단어를 검색
        // 단어 명으로 찾기
        try {
            if (wordClass === "wordName") {
                // 우리꺼
                // words = await Word.find({keyword: {'$regex':word}});
                // 연습중 ''로 안 묶어도 되네? 
                // words = await Word.find({keyword: {'$regex':`^${word}`}});
                // words = await Word.find({keyword: {'$regex':`${word}$`}});
                // words = await Word.find({keyword: {$regex: word}});
                
                words = await Word.find({
                    $or: [
                        {keyword: {$regex: queries}},
                        {meaning: {$regex: queries}}
                    ]});

                // words = await Word.find({
                //     $or: [
                //         {keyword: {$regex: word}},
                //         {meaning: {$regex: word}}
                //     ]
                //     // 오림차순 1 asc / 내림차순 -1 desc
                //     }).sort({'_id': 'asc'})
                //     // 개수제한
                //     // .limit(5);

            } else {
                // 품사로 찾기
                words = await Word.find({word_class: {'$regex':word}});
            }
        } catch(e) {
            console.log(e)
        }
    }else {
        console.log(word)
        try {
            words = await Word.find()
        } catch(e) {
            console.log(e)
        }
        // DB에서 전체 단어 검색
    }
    res.json({status:200, words})
})

module.exports = wordRouter