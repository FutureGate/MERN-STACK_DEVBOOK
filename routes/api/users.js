const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// 보안 관련 모듈 로드
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// 회원 모델 로드
const User = require('../../models/User');

// 프로필 모델 로드
const Profile = require('../../models/Profile');


// 회원가입 입력 검증 모듈 로드
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');




// @route   GET api/users/test
// @desc    회원 라우터 테스트
// @access  Public
router.get('/___test___', (req, res) => {
    res.json({
        msg: '회원 테스트'
    })
});

// @route   POST api/users/test
// @desc    회원 가입
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user)
            {
                return res.status(400).json({
                    email: '해당 이메일을 가진 ID가 이미 존재합니다.'
                });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // 크기
                    r: 'pg',    // 레이팅
                    d: 'mm'     // 기본값    
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});


// @route   DELETE api/users/unregister
// @desc    회원 탈퇴
// @access  Private
router.delete('/unregister', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({
                    success: true
                }));
        });
});



// @route   POST api/users/login
// @desc    회원 로그인 / JWT 토큰 반환
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    
    const email = req.body.email;
    const password = req.body.password;


    // email로 회원 찾기
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = "해당하는 회원이 존재하지 않습니다.";
                return res.status(404).json(errors);
            }

            // 패스워드 확인
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // 회원 비밀번호가 일치할 때
                        // JWT PAYLOAD 생성
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        // JWT 토큰 생성
                        // 1시간 동안 유효
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = "패스워드가 일치하지 않습니다.";
                        return res.status(400).json(errors);
                    }
                });
        })
});



// @route   GET api/users/current
// @desc    현재 로그인된 회원 정보 반환
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});

module.exports = router;