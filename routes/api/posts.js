const express = require('express');
const router = express.Router();

// 몽고 DB 모듈 로드
const mongoose = require('mongoose');

// 패스포트 모듈 로드
const passport = require('passport');

// 게시물 모델 로드
const Post = require('../../models/Posts');

// 프로필 모델 로드
const Profile = require('../../models/Profile');

// 유효성 검증 모듈 로드
const validatePostInput = require('../../validation/post');


// @route   GET api/posts/test
// @desc    게시물 라우터 테스트
// @access  Public
router.get('/___test___', (req, res) => {
    res.json({
        msg: '게시물 테스트'
    })
});

// @route   GET api/posts
// @desc    게시물 전체 얻기
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            noPostFound: "게시물이 없습니다."
        }));
});

// @route   GET api/posts/:id
// @desc    게시물 아이디로 게시물 얻기
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            noPostFound: "해당하는 글이 없습니다."
        }));
});

// @route   POST api/posts/
// @desc    게시물 작성
// @access  Public
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar
    });

    newPost.save()
        .then(post=> res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    게시물 삭제 (ID로 서치)
// @access  Public
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notAuthorized: "권한이 없습니다."
                        });
                    }

                    post.remove()
                        .then(() => res.json({
                            success: true
                        }))
                })
                .catch(err => res.status(404).json({
                    noPostFound: "해당하는 글이 없습니다."
                }));
        });
});


// @route   POST api/posts/like/:id
// @desc    게시물 좋아요
// @access  Public
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyLiked: "이미 좋아요한 글입니다."
                        });
                    }
                    post.likes.unshift({ user: req.user.id });

                    post.save()
                        .then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    noPostFound: "해당하는 글이 없습니다."
                }));
        });
});

// @route   POST api/posts/unlike/:id
// @desc    게시물 좋아요 취소
// @access  Public
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            notLiked: "이 글에 좋아요를 누르지 않았습니다."
                        });
                    }

                    const removeIndex = post.likes
                                    .map(item => item.user.toString())
                                    .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    post.save()
                        .then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    noPostFound: "해당하는 글이 없습니다."
                }));
        });
});

// @route   POST api/comment/:id
// @desc    댓글 달기
// @access  Public
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.user.name,
                avatar: req.user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            post.save()
            .then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            noPostFound: "해당하는 글이 없습니다."
        }));
});

// @route   DELETE api/comment/:id/:comment_id
// @desc    댓글 삭제
// @access  Public
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                        return res.status(404).json({
                            noCommentFound: "해당하는 댓글이 없습니다."
                        });
                    }

                    if(post.comments.filter(comment => comment.user.toString() == profile.user.toString()).length === 0) {
                        return res.status(404).json({
                            notAuthorized: "권한이 없습니다."
                        });
                    }

                    const removeIndex = post.comments
                                    .map(item => item._id.toString())
                                    .indexOf(req.params.comment_id);
                    
                    post.comments.splice(removeIndex, 1);

                    

                    post.save()
                        .then(res.json(post));
                })
                .catch(err => res.status(404).json({
                    noPostFound: "해당하는 글이 없습니다."
                }));
        });
});

module.exports = router;