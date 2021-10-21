const express = require('express') // 외부 모듈 express를 불러온다.
const router = express.Router() // 라우터 기본 세팅 express생성
const book = require('./book') // todo경로의 파일을 사용하겠다.

router.use('/books', book);

module.exports = router;