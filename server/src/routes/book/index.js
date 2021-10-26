const express = require('express');
const BookRouter = express.Router();
const Book = require('../../models/Book')

BookRouter.get('/', async(req, res) => {
    const books = await Book.find();
    res.json({status: 200, books});
})

BookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:200, book});
    })
})

BookRouter.post('/', (req, res) => {
    Book.findOne({ISBN: req.body.ISBN}, async(err, book) => {
        if(err) throw err;
        if(!book) {
            const newBook = new Book(req.body);
            await newBook.save().then(() => {
                res.json({status: 201, msg: '책이 등록되었습니다.', newBook})
            })
        }else {
            const msg = '이미 등록된 책입니다!'
            console.log(msg);
            res.json({status: 204, msg});
        }
    })
})

BookRouter.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, book) => {
        if(err) throw err;
        res.json({status:204, msg: `책 ${req.body.title}의 내용이 변경되었습니다.`, book})
    })
})
// json position 오류가 난다. ISBN의 타입이 문제인듯한데 int로 만들어도 소용이없다.
// 그러면 한번더 "" 만들어 String으로 만들어보면 어떨까?
// BookRouter.put('/:ISBN', (req, res) => {
//     Book.findByIdAndUpdate(req.params.ISBN, req.body, {new:true}, (err, book) => {
//         if(err) throw err;
//         res.json({status:204, msg: `책 ${req.body.title}의 내용이 변경되었습니다.`, book})
//     })
// })

BookRouter.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:204, msg: `책 ${req.params.title} 삭제되었습니다.`});
    })
})




module.exports = BookRouter;