const Validator = require('validator');
const isEmpty = require('./is-empty');

const ProfileInfoLimit = require('../config/ProfileInfoLimit');

module.exports = function validateProfileInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    

    if(!Validator.isLength(data.handle, { min: ProfileInfoLimit.profileHandleMinLength, max: ProfileInfoLimit.profileHandleMaxLength})) {
        errors.handle = "프로필 명을 " + ProfileInfoLimit.profileHandleMinLength + " ~ " + ProfileInfoLimit.profileHandleMaxLength + " 자 내로 입력해주세요.";
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = "프로필 명을 입력해주세요.";
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = "직업을 입력하세요.";
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = "기술을 입력해주세요.";
    }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = "입력하신 웹사이트 주소가 유효하지 않습니다.";
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = "입력하신 유튜브 주소가 유효하지 않습니다.";
        }
    }

    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = "입력하신 트위터 주소가 유효하지 않습니다.";
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = "입력하신 페이스북 주소가 유효하지 않습니다.";
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = "입력하신 링크드인 주소가 유효하지 않습니다.";
        }
    }

    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = "입력하신 인스타그램 주소가 유효하지 않습니다.";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}