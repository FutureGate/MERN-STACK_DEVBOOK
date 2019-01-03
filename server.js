//-------------------------------------------------------------------------------

//  모듈 로드

//-------------------------------------------------------------------------------

const express = require('express');
const app = express();

// 몽고 DB 모듈 로드
const mongoose = require('mongoose');

// 패스포트 모듈 로드 ( 로그인 관련 )
const passport = require('passport');

// 바디 파서 로드
const bodyParser = require('body-parser');

// 라우터 모듈 로드
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//-------------------------------------------------------------------------------

//  미들 웨어

//-------------------------------------------------------------------------------

// 바디 파서 미들웨어 선언
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 패스포트 미들웨어 선언
app.use(passport.initialize());


//-------------------------------------------------------------------------------

// 몽고 DB 설정

//-------------------------------------------------------------------------------

// 몽고 DB 경로 설정
const db = require('./config/keys').mongoURI;

// 몽고 DB 연결
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB 연결 됨!'))
.catch(err => console.log(err));

//-------------------------------------------------------------------------------

// 패스포트 모듈

//-------------------------------------------------------------------------------

// 패스포트 모듈 설정
require('./config/passport')(passport);

//-------------------------------------------------------------------------------

// 라우터

//-------------------------------------------------------------------------------

// 라우터 사용
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//-------------------------------------------------------------------------------

// 서버

//-------------------------------------------------------------------------------

// 서버 포트 설정
const port = process.env.PORT || 5000;

// 서버 시작
app.listen(port, () => console.log(`서버가 포트 ${port} 에서 가동 중...`));