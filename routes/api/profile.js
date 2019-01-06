const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

// 모델 로드
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// 유효성 검사 모델 로드
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');




// @route   GET api/profile/test
// @desc    프로필 라우터 테스트
// @access  Public
router.get('/___test___', (req, res) => {
    res.json({
        msg: '프로필 테스트'
    })
});

// @route   GET api/profile/all
// @desc    모든 사용자 프로필 얻기
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', [ 'name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofile = "등록된 프로필이 없습니다."
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            noprofile: "등록된 프로필이 없습니다."
        }));
});

// @route   POST api/profile
// @desc    현재 회원 프로필 얻기
// @access  Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = "해당 프로필이 존재하지 않습니다.";
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch( err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    프로필 명으로 프로필 얻기
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = " 해당 프로필이 존재하지 않습니다.";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    사용자 아이디로 프로필 얻기
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .then(profile => {
        if(!profile) {
            errors.noprofile = "해당 프로필이 존재하지 않습니다.";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json({
        noprofile: "해당 프로필이 존재하지 않습니다."
    }));
});


// @route   POST api/profile
// @desc    유저 프로필 추가 / 수정
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    // 기본 정보
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    
    // 기술 파트            < 참고 > 기술 모델은 배열로 되어있음
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // SNS 정보 파트        < 참고 > SNS 정보 모델은 오브젝트로 되어있음
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne( { user: req.user.id })
        .then(profile => {
            if(profile) {
                // 기존 프로필 수정
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                .then(profile => res.json(profile))
            } else {
                // 새로운 프로필 추가

                // 핸들이 있는지 조사
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = "해당 프로필 명을 가진 사용자가 이미 존재합니다.";
                            res.status(400).json(errors);
                        }

                        // 프로필 저장
                        new Profile(profileFields).save()
                        .then(profile => {
                            res.json(profile);
                        })
                    });
            }
        });
});

// @route   POST api/profile/experience
// @desc    프로필에 경력 추가
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne( { user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // 경력 배열에 추가
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
});

// @route   POST api/profile/education
// @desc    프로필에 학력 추가
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne( { user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // 경력 배열에 추가
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    프로필 경력 삭제
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.experience
                            .map(item => item.id)
                            .indexOf(req.params.exp_id);

            profile.experience.splice(removeIndex, 1);

            profile.save()
            .then(profile => res.json(profile));
        });
});

// @route   DELETE api/profile/education/:edu_id
// @desc    프로필 경력 삭제
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.education
                            .map(item => item.id)
                            .indexOf(req.params.edu_id);

            profile.education.splice(removeIndex, 1);

            profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json(err));
        })
});

module.exports = router;