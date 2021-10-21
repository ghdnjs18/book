var express = require('express');
var app = express();
var logger = require('morgan');
var mongmoos = require('mongoose');
var routes = require('./src/routes');

// mongoDB 연결
const CONNECT_URL = 'mongodb://localhost:27017/book_project'
mongmoos.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("몽고DB 연결중..."))
  .catch(e => console.log('데이터베이스 연결 실패 !: ${e}'))

// 미들웨어
app.use(express.json());
app.use(logger('tiny'));

app.use('/api', routes);

// 오류 페이지 처리
app.use((req, res, next) => {
    res.status(404).send("페이지를 찾을 수 없습니다.");
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("내부 에러 발생")
})

// 서버 오픈
app.listen(5000, () => {
    console.log('서버 실행중... 포트번호 5000...');
})